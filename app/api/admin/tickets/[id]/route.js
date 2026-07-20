import { NextResponse } from "next/server";
import { requireAuth } from "../../../../../server/utils/auth";
import { handleError } from "../../../../../server/errors/handleError";
import ticketChat from "../../../../../server/controllers/admin/ticketChat";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    await requireAuth(request, ["superadmin", "admin", "editor"]);

    const result = await ticketChat.ticket({ id });

    return NextResponse.json(result);

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

    await ticketChat.update({
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

export async function POST(request, { params }) {
  try {

    const { id } = await params;

    const session = await requireAuth(request, [
      "superadmin",
      "admin",
      "editor"
    ]);

    const senderType = session.role === "author" ? "user" : "admin";

    const body = await request.json();

    const messages = await ticketChat.create({
      id,
      senderId: session.id,
      senderType,
      message: body.message,
      isInternal: senderType === "admin"
        ? body.isInternal ?? false
        : false
    });

    return NextResponse.json({
      success: true,
      messages
    });

  } catch (error) {
    console.error(error);
    return handleError(error);
  }
}