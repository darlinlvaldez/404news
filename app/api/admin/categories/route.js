import { NextResponse } from "next/server";
import categoryController from "../../../../server/controllers/admin/categories";
import { requireAuth } from "../../../../server/utils/auth";
import { handleError } from "../../../../server/errors/handleError";
import { categories as categoriesSchema } from "../../../../server/schemas/admin/categories";

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

    categoriesSchema.parse(body);
    
    const result = await categoryController.create(body);

    return NextResponse.json(result);

  } catch (error) {
    return handleError(error);
  }
}