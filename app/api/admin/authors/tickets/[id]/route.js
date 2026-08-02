import { NextResponse } from "next/server";
import { requireAuth } from "../../../../../../server/utils/auth";
import { handleError } from "../../../../../../server/errors/handleError";
import { saveTicketAttachments } from "../../../../../../server/services/admin/tickets/ticketAttachments";
import ticketChatAuthor from "../../../../../../server/controllers/admin/tickets/ticketChatAuthor";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const { searchParams } = new URL(request.url);
    const limit = Number(searchParams.get("limit")) || 5;
    const beforeId = searchParams.get("beforeId");

    const session = await requireAuth(request, ["author"]);

    await ticketChatAuthor.markReadAuthor({
      ticketId: id,
      userId: session.id
    });

    const result = await ticketChatAuthor.ticket({ 
      id, 
      limit,
      beforeId,
      userId: session.id 
    });

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

    const formData = await request.formData();

    const message = formData.get("message") ?? "";
    const files = formData.getAll("files");

    const attachments = await saveTicketAttachments(files);

    const result = await ticketChatAuthor.create({
      id,
      senderId: session.id,
      senderType: "author",
      message,
      attachments,
    });

    return NextResponse.json({
      success: true,
      message: result,
    });
  } catch (error) {
    console.error(error);
    return handleError(error);
  }
}