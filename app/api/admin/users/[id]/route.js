import { NextResponse } from "next/server";
import usersController from "../../../../../server/controllers/admin/users";
import { requireAuth } from "../../../../../server/utils/auth";
import { handleError } from "../../../../../server/errors/handleError";

export async function PUT(request, context) {
  try {
    await requireAuth(request);

    const { id } = context.params;
    const body = await request.json();

    const result = await usersController.update(Number(id), body);
    return NextResponse.json(result);

  } catch (error) {
    console.error("Error updating user:", error);
    return handleError(error);
  }
}

export async function DELETE(request, context) {
  try {
    await requireAuth(request);

    const { id } = context.params;

    const result = await usersController.remove(Number(id));
    return NextResponse.json(result);

  } catch (error) {
    console.error("Error deleting user:", error);
    return handleError(error);
  }
}