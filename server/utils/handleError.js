import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function handleError(error) {

  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        errors: error.flatten().fieldErrors,
      },
      {
        status: 400,
      }
    );
  }

  let status = 500;

  if (error.message === "UNAUTHORIZED") status = 401;
  else if (error.message === "FORBIDDEN") status = 403;
  else if (error.message === "Invalid ID") status = 400;

  else if (error.message === "USER NOT FOUND") status = 401;
  else if (error.message === "WRONG PASSWORD") status = 401;
  else if (error.message === "ACCOUNT BLOCKED") status = 403;

  return NextResponse.json(
    { error: error.message },
    { status }
  );
}