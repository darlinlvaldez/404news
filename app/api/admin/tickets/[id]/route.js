import { NextResponse } from "next/server";
import { requireAuth } from "../../../../../server/utils/auth";
import { handleError } from "../../../../../server/errors/handleError";
import { saveTicketAttachments } from "../../../../../server/services/admin/tickets/ticketAttachments";
import { message as messageSchema } from "../../../../../server/schemas/admin/tickets/message";
import ticketChatAdmin from "../../../../../server/controllers/admin/tickets/ticketChatAdmin";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const session = await requireAuth(request, [
      "superadmin",
      "admin",
      "editor",
    ]);

    await ticketChatAdmin.markReadAdmin({
      ticketId: id,
    });

    const ticket = await ticketChatAdmin.ticket({
      id,
    });

    return NextResponse.json({
      ticket,
      currentUserId: session.id,
    });

  } catch (error) {
    console.error(error);
    return handleError(error);
  }
}

export async function POST(request, { params }) {
  try {

    const { id } = await params;

    const session = await requireAuth(request, [
      "superadmin", "admin", "editor"
    ]);

    const senderType = "admin";

    const formData = await request.formData();
    
    const messageText = formData.get("message") ?? "";
    const files = formData.getAll("files");

    const { message: validatedMessage } = messageSchema.parse({
      message: messageText,
    });
    
    const attachments = await saveTicketAttachments(files);

    const isInternal = formData.get("isInternal") === "true";

    const message = await ticketChatAdmin.create({
      id,
      senderId: session.id,
      senderType,
      message: validatedMessage,
      isInternal,
      attachments,
    });

    return NextResponse.json({
      success: true,
      message
    });

  } catch (error) {
    console.error(error);
    return handleError(error);
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;

    await requireAuth(request, ["superadmin", "admin", "editor"]);

    const body = await request.json();

    await ticketChatAdmin.update({
      id,
      status: body.status,
      priority: body.priority
    });

    return NextResponse.json({success: true});
  } catch (error) {
    console.error(error);
    return handleError(error);
  }
}