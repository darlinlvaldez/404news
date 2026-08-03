import { NextResponse } from "next/server";
import { requireAuth } from "../../../../../../server/utils/auth";
import { handleError } from "../../../../../../server/errors/handleError";
import ticketChatAdmin from "../../../../../../server/controllers/admin/tickets/ticketChatAdmin";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const { searchParams } = new URL(request.url);

    const limit = Number(searchParams.get("limit")) || 5;
    const beforeId = searchParams.get("beforeId");

    await requireAuth(request, [
      "superadmin",
      "admin",
      "editor",
    ]);

    const messages = await ticketChatAdmin.messages({
      ticketId: id,
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