import { NextResponse } from "next/server";
import usersController from "../../../../server/controllers/admin/users";
import { createUserSchema } from "../../../../server/schemas/admin/password/createMerge";
import { handleError } from "../../../../server/errors/handleError";

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

  createUserSchema.parse(body);
  
  const result = await usersController.create(body);

  return NextResponse.json(result);
  } catch (error) {
    console.log(error)
    return handleError(error);
  }
}