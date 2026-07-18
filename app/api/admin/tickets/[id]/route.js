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