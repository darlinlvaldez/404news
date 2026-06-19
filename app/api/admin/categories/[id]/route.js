import { NextResponse } from "next/server";
import categoryController from "../../../../../server/controllers/admin/categories";
import { requireAuth } from "../../../../../server/utils/auth";
import { handleError } from "../../../../../server/utils/handleError";

export async function PUT(request, context) {
  try {
    await requireAuth(request, ["superadmin", "admin"]);

    const { id } = await context.params;

    const body = await request.json();
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