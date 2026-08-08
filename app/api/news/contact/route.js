import { NextResponse } from "next/server";
import { handleError } from "../../../../server/errors/handleError";
import { contact as contactSchema } from "../../../../server/schemas/news/contact";
import createPendingTicket from "../../../../server/services/news/contact/createPendingTicket";
import { checkTicketRateLimit } from "../../../../server/services/news/contact/ticketRateLimit";

export async function POST(req) {
  try {
    const body = await req.json();

    const data = contactSchema.parse(body);

    const visitorId = req.cookies.get("visitor_id")?.value;

    if (!visitorId) {
      throw new ApiError(
        400,
        null,
        "No se pudo identificar al visitante."
      );
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    await checkTicketRateLimit({
      ip,
      visitorId,
    });

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