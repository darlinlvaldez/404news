import { NextResponse } from "next/server";
import authorsController from "../../../../../server/controllers/admin/authors";
import { requireAuth } from "../../../../../server/utils/auth";
import { handleError } from "../../../../../server/errors/handleError";
import { updateAuthorSchema } from "../../../../../server/schemas/admin/password/updateMerge";

export async function PUT(request, context) {
  try {
    await requireAuth(request, ["superadmin", "admin"]);

    const { id } = await context.params;

    const body = await request.json();

    updateAuthorSchema.parse(body);

    const result = await authorsController.update(id, body);

    return NextResponse.json(result);
  } catch (error) {
    console.log(error)
    return handleError(error);
  }
}

export async function DELETE(request, context) {
  try {
    await requireAuth(request, ["superadmin", "admin"]);
    
    const { id } = await context.params;

    const result = await authorsController.remove(id);

    return NextResponse.json(result);
  } catch (error) {
    console.log(error)
    return handleError(error);
  }
}