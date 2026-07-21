import { NextResponse } from "next/server";
import { requireAuth } from "../../../../../server/utils/auth";
import { handleError } from "../../../../../server/errors/handleError";
import ticketsController from "../../../../../server/controllers/admin/tickets";

export async function GET(request) {
  try {
    const session = await requireAuth(request, ["author"]);

    const { searchParams } = new URL(request.url);

    const limit = searchParams.get("limit") || 50;
    const offset = searchParams.get("offset") || 0;
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";

    const result = await ticketsController.ticketsTableMinimum({
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