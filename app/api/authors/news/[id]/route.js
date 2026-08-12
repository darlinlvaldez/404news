import { NextResponse } from "next/server";
import { requireAuth } from "../../../../../server/utils/auth";
import { handleError } from "../../../../../server/errors/handleError";
import { news as newsSchema } from "../../../../../server/schemas/news"
import { newsBlocks } from "../../../../../server/schemas/admin/newsBlocks"
import newsController from "../../../../../server/controllers/authors/news";

export async function GET(req, context) {
  try {
    const user = await requireAuth(req, ["author"]);

    const { id } = await context.params;

    const result = await newsController.getById(user.id, id);

    return NextResponse.json(result);

  } catch (error) {
    console.error(error);
    return handleError(error);
  }
}

export async function PUT(req, context) {
  try {
    const user = await requireAuth(req, ["author"]);

    const { id } = await context.params;
    
    const body = await req.json();

    body.news = newsSchema.parse(body.news);
    body.blocks = newsBlocks.parse(body.blocks);

    const result = await newsController.update({
      userId: user.id,
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
    const user = await requireAuth(req, ["author"]);

    const { id } = await context.params;

    const result = await newsController.delete(user.id, id);

    return NextResponse.json(result);

  } catch (error) {
    console.error(error);
    return handleError(error);
  }
}