import { NextResponse } from "next/server";
import categoryController from "../../../../../server/controllers/admin/categories";
import { requireAuth } from "../../../../../server/utils/auth";
import { handleError } from "../../../../../server/errors/handleError";
import { categories as categoriesSchema } from "../../../../../server/schemas/admin/categories";

export async function PUT(request, context) {
  try {
    await requireAuth(request, ["superadmin", "admin"]);

    const { id } = await context.params;

    const body = await request.json();

    categoriesSchema.parse(body);

    const result = await categoryController.update(id, body);

    return NextResponse.json(result);

  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(request, context) {
  try {
    await requireAuth(request, ["superadmin"]);

    const { id } = await context.params;

    const result = await categoryController.remove(id);

    return NextResponse.json(result);

  } catch (error) {
    return handleError(error);
  }
}