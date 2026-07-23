import { NextResponse } from "next/server";
import { requireAuth } from "../../../../../../server/utils/auth";
import { handleError } from "../../../../../../server/errors/handleError";
import ticketChatAuthor from "../../../../../../server/controllers/admin/ticketChatAuthor";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const session = await requireAuth(request, ["author"]);

    const result = await ticketChatAuthor.ticket({ id, userId: session.id });

    return NextResponse.json({
      ticket: result.ticket,
      messages: result.messages,
      session: {
        id: session.id
      }
    });
    
  } catch (error) {
    console.error(error);
    return handleError(error);
  }
}

export async function POST(request, { params }) {
  try {
    const { id } = await params;

    const session = await requireAuth(request, ["author"]);

    const body = await request.json();

    const messages = await ticketChatAuthor.create({
      id,
      userId: session.id,
      senderId: session.id,
      senderType: "author",
      message: body.message,
    });

    return NextResponse.json({
      success: true,
      messages,
    });
  } catch (error) {
    console.error(error);
    return handleError(error);
  }
}