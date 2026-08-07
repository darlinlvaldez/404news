import { NextResponse } from "next/server";
import { handleError } from "../../../../server/errors/handleError";
import { contact as contactSchema } from "../../../../server/schemas/news/contact";
import createPendingTicket from "../../../../server/services/news/contact/createPendingTicket";

export async function POST(req) {
  try {
    const body = await req.json();

    const data = contactSchema.parse(body);

    const result = await createPendingTicket(data);

    return NextResponse.json({
      message: "Revisa tu correo para confirmar tu solicitud.",
      ...result,
    });

  } catch (error) {
    console.error(error);
    return handleError(error);
  }
}