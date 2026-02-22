import { NextResponse } from "next/server";
import newsController from "@/server/controllers/admin/news";

export async function GET(req, context) {
  const { id } = await context.params;

  const result = await newsController.getById(id);

  return NextResponse.json(result);
}

export async function PUT(req, context) {
  const { id } = await context.params;
  const body = await req.json();

  const result = await newsController.update({
    id,
    news: body.news,
    blocks: body.blocks
  });

  return NextResponse.json(result);
}

export async function DELETE(req, context) {
  const { id } = await context.params;

  const result = await newsController.delete(id);

  return NextResponse.json(result);
}