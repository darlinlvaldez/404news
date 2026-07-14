import { NextResponse } from "next/server";
import usersController from "../../../../server/controllers/admin/users";
import { requireAuth } from "../../../../server/utils/auth";
import { createUserSchema } from "../../../../server/schemas/admin/password/createMerge";
import { handleError } from "../../../../server/errors/handleError";

export async function GET(request) {
  try {
    const user = await requireAuth(request, ["superadmin"]);
      
    const users = await usersController.getAll(user.id);

    return NextResponse.json(users);
  } catch (error) {
    console.log(error)
    return handleError(error);
  }
}

export async function POST(request) {
  try {
    await requireAuth(request, ["superadmin"]);
  
    const body = await request.json();

    createUserSchema.parse(body);
    
    const result = await usersController.create(body);

    return NextResponse.json(result);
  } catch (error) {
    console.log(error)
    return handleError(error);
  }
}