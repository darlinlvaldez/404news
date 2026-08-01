import { NextResponse } from "next/server";
import { requireAuth } from "../../../../../server/utils/auth";
import { handleError } from "../../../../../server/errors/handleError";
import ticketsAdmin from "../../../../../server/controllers/admin/tickets/ticketsAdmin";

export async function GET(request) {
  try {
    await requireAuth(request, ["superadmin", "admin", "editor"]);

    const authors = await ticketsAdmin.getAuthorsForSelect();

    return NextResponse.json(authors);

  } catch (error) {
    console.error(error);
    return handleError(error);
  }
}