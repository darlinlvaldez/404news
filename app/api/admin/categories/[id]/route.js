import { NextResponse } from "next/server";
import categoryController from "@/server/controllers/admin/categories";

export async function PUT(request, context) {
  const { id } = await context.params;
  const body = await request.json();

  const result = await categoryController.update(id, body);
  return NextResponse.json(result);
}

export async function DELETE(request, context) {
  const params = await context.params;
  const id = Number(params.id); 

  const result = await categoryController.remove(id);
  return NextResponse.json(result);
}