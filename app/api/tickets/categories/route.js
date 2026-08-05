import { NextResponse } from "next/server";
import { requireAuth } from "../../../../server/utils/auth";
import { handleError } from "../../../../server/errors/handleError";
import {getTicketCategories} from "../../../../server/services/admin/catalog";

export async function GET(request) {
  try {
    await requireAuth(request, ["superadmin", "admin", "support", "author"]);

    const categories = await getTicketCategories();

    return NextResponse.json(categories);
  } catch (error) {
    return handleError(error);
  }
}