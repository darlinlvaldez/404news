import { NextResponse } from "next/server";
import { requireAuth } from "../../../../server/utils/auth";
import { handleError } from "../../../../server/errors/handleError";
import { saveTicketAttachments } from "../../../../server/services/admin/tickets/ticketAttachments";
import ticketsAdmin from "../../../../server/controllers/admin/tickets/ticketsAdmin";

export async function GET(request) {
  try {
    await requireAuth(request, ["superadmin", "admin", "editor"]);

    const { searchParams } = new URL(request.url);

    const limit = searchParams.get("limit") || 50;
    const offset = searchParams.get("offset") || 0;
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";
    const priority = searchParams.get("priority") || "";
    const type = searchParams.get("type") || "";

    const result = await ticketsAdmin.ticketsTable({
      limit,
      offset,
      search,
      status,
      priority,
      type
    });

    return NextResponse.json(result);

  } catch (error) {
    console.error(error);
    return handleError(error);
  }
}

export async function POST(request) {
  try {
    const session = await requireAuth(request, ["superadmin", "admin", "editor"]);

    const formData = await request.formData();

    const userId = formData.get("userId");
    const type = formData.get("type") || "submission";
    const subject = formData.get("subject");
    const message = formData.get("message");
    const priority = formData.get("priority") || "medium";
    const categoryId = formData.get("categoryId");
    const files = formData.getAll("files");

    const attachments = await saveTicketAttachments(files);

    const result = await ticketsAdmin.create({
      userId: Number(userId),
      senderId: session.id,
      type,
      subject,
      message,
      priority,
      categoryId: Number(categoryId),
      attachments,
    });

    return NextResponse.json({
      success: true,
      ticket: result,
    });

  } catch (error) {
    console.error(error);
    return handleError(error);
  }
}