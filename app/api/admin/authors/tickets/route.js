import { NextResponse } from "next/server";
import { requireAuth } from "../../../../../server/utils/auth";
import { handleError } from "../../../../../server/errors/handleError";
import ticketsAuthor from "../../../../../server/controllers/admin/tickets/ticketsAuthor";
import { saveTicketAttachments } from "../../../../../server/services/admin/tickets/ticketAttachments";

export async function GET(request) {
  try {
    const session = await requireAuth(request, ["author"]);

    const { searchParams } = new URL(request.url);

    const limit = searchParams.get("limit") || 50;
    const offset = searchParams.get("offset") || 0;
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";

    const result = await ticketsAuthor.ticketsTableMinimum({
      limit,
      offset,
      search,
      status,
      userId: session.id
    });

    return NextResponse.json(result);

  } catch (error) {
    console.error(error);
    return handleError(error);
  }
}

export async function POST(request) {
  try {
    const session = await requireAuth(request, ["author"]);

    const formData = await request.formData();

    const subject = formData.get("subject");
    const message = formData.get("message");
    const files = formData.getAll("files");

    const attachments = await saveTicketAttachments(files);

    const ticket = await ticketsAuthor.create({
      userId: session.id,
      subject,
      message,
      attachments,
    });

    return NextResponse.json({
      success: true,
      ticket,
    });

  } catch (error) {
    console.error(error);
    return handleError(error);
  }
}