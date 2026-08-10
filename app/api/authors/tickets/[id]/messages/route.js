import { NextResponse } from "next/server";
import { requireAuth } from "../../../../../../server/utils/auth";
import { handleError } from "../../../../../../server/errors/handleError";
import ticketChatAuthor from "../../../../../../server/controllers/admin/tickets/ticketChatAuthor";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const { searchParams } = new URL(request.url);
    const limit = Number(searchParams.get("limit")) || 5;
    const beforeId = searchParams.get("beforeId");

    const session = await requireAuth(request, ["author"]);

    const messages = await ticketChatAuthor.messages({
      id,
      userId: session.id,
      limit,
      beforeId,
    });

    return NextResponse.json({
      messages,
    });
    
  } catch (error) {
    console.error(error);
    return handleError(error);
  }
}
