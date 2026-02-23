import { NextResponse } from "next/server";
import usersController from "@/server/controllers/admin/users";

export async function PUT(request, context) {
  const { id } = context.params;
  const body = await request.json();

  const result = await usersController.update(Number(id), body);
  return NextResponse.json(result);
}

export async function DELETE(request, context) {
  const { id } = context.params;

  const result = await usersController.remove(Number(id));
  return NextResponse.json(result);
}