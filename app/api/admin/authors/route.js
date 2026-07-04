import { NextResponse } from "next/server";
import authorsController from "../../../../server/controllers/admin/authors";
import { requireAuth } from "../../../../server/utils/auth";
import { handleError } from "../../../../server/errors/handleError";

export async function GET(request) {
  try {
    await requireAuth(request, ["superadmin", "admin", "editor"]);
    const result = await authorsController.getAll();
    return NextResponse.json(result);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request) {
  try {
    await requireAuth(request, ["superadmin", "admin"]);
    const body = await request.json();
    const result = await authorsController.create(body);
    return NextResponse.json(result);
  } catch (error) {
    return handleError(error);
  }
}