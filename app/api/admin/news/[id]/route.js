import { NextResponse } from "next/server";
import newsController from "../../../../../server/controllers/admin/news";
import { requireAuth } from "../../../../../server/utils/auth";
import { handleError } from "../../../../../server/utils/handleError";

export async function GET(req, context) {
  try {
    await requireAuth(req, ["superadmin", "admin", "editor"]);

    const { id } = await context.params;

    const result = await newsController.getById(id);

    return NextResponse.json(result);

  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(req, context) {
  try {
    await requireAuth(req, ["superadmin", "admin", "editor"]);

    const { id } = await context.params;
    const body = await req.json();

    const result = await newsController.update({
      id,
      news: body.news,
      blocks: body.blocks
    });

    return NextResponse.json(result);

  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(req, context) {
  try {
    await requireAuth(req, ["superadmin", "admin"]);

    const { id } = await context.params;

    const result = await newsController.delete(id);

    return NextResponse.json(result);

  } catch (error) {
    return handleError(error);
  }
}