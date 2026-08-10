import { NextResponse } from "next/server";
import { requireAuth } from "../../../../../server/utils/auth";
import { handleError } from "../../../../../server/errors/handleError";
import { saveTicketAttachments } from "../../../../../server/services/admin/tickets/ticketAttachments";
import { message as messageSchema } from "../../../../../server/schemas/admin/tickets/message";
import ticketChatAuthor from "../../../../../server/controllers/admin/tickets/ticketChatAuthor";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const session = await requireAuth(request, ["author"]);

    await ticketChatAuthor.markReadAuthor({
      ticketId: id,
      userId: session.id
    });

    const ticket = await ticketChatAuthor.ticket({
      id,
      userId: session.id,
    });

    return NextResponse.json({
      ticket,
      session: {
        id: session.id,
      },
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

    const data = messageSchema.parse({ message });

    const attachments = await saveTicketAttachments(files);

    const result = await ticketChatAuthor.create({
      id,
      senderId: session.id,
      senderType: "author",
      message: data.message,
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