import { NextResponse } from "next/server";
import { requireAuth } from "../../../../server/utils/auth";
import { handleError } from "../../../../server/errors/handleError";
import { saveTicketAttachments } from "../../../../server/services/admin/tickets/ticketAttachments";
import {ticketContent as ticketSchema } from "../../../../server/schemas/admin/tickets/shared";
import ticketsAuthor from "../../../../server/controllers/admin/tickets/ticketsAuthor";

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
    const categoryId = formData.get("categoryId");

    const data = ticketSchema.parse({
      categoryId,
      subject,
      message,
    });

    const attachments = await saveTicketAttachments(files);

    const ticket = await ticketsAuthor.create({
      userId: session.id,
      subject: data.subject,
      message: data.message,
      categoryId: data.categoryId,
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