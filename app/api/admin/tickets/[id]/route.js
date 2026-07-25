import { NextResponse } from "next/server";
import { requireAuth } from "../../../../../server/utils/auth";
import { handleError } from "../../../../../server/errors/handleError";
import ticketChatAdmin from "../../../../../server/controllers/admin/ticketChatAdmin";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const { searchParams } = new URL(request.url);
    const limit = Number(searchParams.get("limit")) || 5;
    const beforeId = searchParams.get("beforeId");

    const session = await requireAuth(request, ["superadmin", "admin", "editor"]);

    await ticketChatAdmin.markReadAdmin({ticketId: id});

    const result = await ticketChatAdmin.ticket({ 
      id, 
      limit,
      beforeId,
    });

    return NextResponse.json({
      ...result,
      currentUserId: session.id
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
      "superadmin",
      "admin",
      "editor"
    ]);

    const senderType = "admin";

    const body = await request.json();

    const message = await ticketChatAdmin.create({
      id,
      senderId: session.id,
      senderType,
      message: body.message,
      isInternal: body.isInternal
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