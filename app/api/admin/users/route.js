import { NextResponse } from "next/server";
import usersController from "../../../../server/controllers/admin/users";

export async function GET() {
  const users = await usersController.getAll();
  return NextResponse.json(users);
}

export async function POST(request) {
  const body = await request.json();
  const result = await usersController.create(body);
  return NextResponse.json(result);
}