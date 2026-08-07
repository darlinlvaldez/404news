import { NextResponse } from "next/server";
import { handleError } from "../../../../../server/errors/handleError";
import verifyPendingTicket from "../../../../../server/services/news/contact/verifyPendingTicket";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const token = searchParams.get("token");

    if (!token) {
      throw new Error("Token de verificación requerido.");
    }

    await verifyPendingTicket(token);

    return NextResponse.redirect(
      new URL("/news/contact?verified=true", req.url)
    );

  } catch (error) {
    console.error(error);
    return handleError(error);
  }
}