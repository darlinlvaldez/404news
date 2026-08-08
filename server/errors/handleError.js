import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { ApiError } from "@/server/errors/apiError";

export function handleError(error) {
  if (error instanceof ZodError) {
    const errors = {};

    error.issues.forEach((issue) => {
      const field = issue.path.join(".");

      errors[field || "general"] = [issue.message];
    });

    return NextResponse.json(
      {
        errors,
      },
      {
        status: 400,
      }
    );
  }

  if (error instanceof ApiError) {
    if (error.field) {
      return NextResponse.json(
        {
          errors: {
            [error.field]: [error.message],
          },
        },
        {
          status: error.status,
        }
      );
    }

    const response = {
      error: error.message,
      ...error.details,
    };

    return NextResponse.json(response, {
      status: error.status,
      headers: error.details?.retryAfter
        ? {
            "Retry-After": String(error.details.retryAfter),
          }
        : undefined,
    });
  }

  return NextResponse.json(
    {
      error: "Error interno del servidor",
    },
    {
      status: 500,
    }
  );
}