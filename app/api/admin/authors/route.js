import { NextResponse } from "next/server";
import authorsController from "../../../../server/controllers/admin/authors";
import { requireAuth } from "../../../../server/utils/auth";
import { handleError } from "../../../../server/errors/handleError";
import { createAuthorSchema } from "../../../../server/schemas/admin/password/createMerge";

export async function GET(request) {
  try {
    await requireAuth(request, ["superadmin", "admin"]);

    const result = await authorsController.getAll();

    return NextResponse.json(result);
  } catch (error) {
    console.log(error)
    return handleError(error);
  }
}

export async function POST(request) {
  try {
    await requireAuth(request, ["superadmin", "admin"]);

    const body = await request.json();

    createAuthorSchema.parse(body);

    const result = await authorsController.create(body);

    return NextResponse.json(result);
  } catch (error) {
    console.log(error)
    return handleError(error);
  }
}