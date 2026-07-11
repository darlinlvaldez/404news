import { NextResponse } from "next/server";
import usersController from "../../../../server/controllers/admin/users";
import { createUser } from "../../../../server/schemas/admin/createMerge";

export async function GET() {
  try {
  const users = await usersController.getAll();

  return NextResponse.json(users);
  } catch (error) {
    console.log(error)
    return handleError(error);
  }
}

export async function POST(request) {
  try {
  const body = await request.json();

  createUser.parse(body);
  
  const result = await usersController.create(body);

  return NextResponse.json(result);
  } catch (error) {
    console.log(error)
    return handleError(error);
  }
}