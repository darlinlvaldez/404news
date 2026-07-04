import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { ApiError } from "./apiError";

export function handleError(error) {

    if (error instanceof ZodError) {
        return NextResponse.json(
            {
                errors: error.flatten().fieldErrors
            },
            {
                status: 400
            }
        );
    }

    if (error instanceof ApiError) {

        if (error.field) {
            return NextResponse.json(
                {
                    errors: {
                        [error.field]: [error.message]
                    }
                },
                {
                    status: error.status
                }
            );
        }

        return NextResponse.json(
            {
                error: error.message
            },
            {
                status: error.status
            }
        );
    }

    return NextResponse.json(
        {
            error: "Error interno del servidor"
        },
        {
            status: 500
        }
    );
}