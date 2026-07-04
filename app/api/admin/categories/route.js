import { NextResponse } from "next/server";
import categoryController from "../../../../server/controllers/admin/categories";
import { requireAuth } from "../../../../server/utils/auth";
import { handleError } from "../../../../server/errors/handleError";

export async function GET(request) {
  try {
    await requireAuth(request, ["superadmin", "admin", "editor"]);

    const result = await categoryController.getAll();
    return NextResponse.json(result);

  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request) {
  try {
    await requireAuth(request, ["superadmin", "admin"]);

    const body = await request.json();
    const result = await categoryController.create(body);

    return NextResponse.json(result);

  } catch (error) {
    return handleError(error);
  }
}