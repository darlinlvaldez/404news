import { NextResponse } from "next/server";
import newsController from "../../../../../server/controllers/admin/news";
import { requireAuth } from "../../../../../server/utils/auth";
import { handleError } from "../../../../../server/errors/handleError";
import { newsAdmin as newsSchema } from "../../../../../server/schemas/admin/news"
import { newsBlocks } from "../../../../../server/schemas/admin/newsBlocks"

export async function GET(req, context) {
  try {
    await requireAuth(req, ["superadmin", "admin", "editor"]);

    const { id } = await context.params;

    const result = await newsController.getById(id);

    return NextResponse.json(result);

  } catch (error) {
    console.error(error);
    return handleError(error);
  }
}

export async function PUT(req, context) {
  try {
    await requireAuth(req, ["superadmin", "admin", "editor"]);

    const { id } = await context.params;
    
    const body = await req.json();

    body.news = newsSchema.parse(body.news);
    body.blocks = newsBlocks.parse(body.blocks);

    const result = await newsController.update({
      id,
      news: body.news,
      blocks: body.blocks
    });

    return NextResponse.json(result);

  } catch (error) {
    console.error(error);
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
    console.error(error);
    return handleError(error);
  }
}