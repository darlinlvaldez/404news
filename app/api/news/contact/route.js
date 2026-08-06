import { NextResponse } from "next/server";
import { handleError } from "../../../../server/errors/handleError";
import { contact as contactSchema } from "../../../../server/schemas/news/contact";
import {createTicket} from "../../../../server/models/news/contact";

export async function POST(req) {
  try {
    const body = await req.json();

    const data = contactSchema.parse(body);

    const result = await createTicket(data);

    return NextResponse.json(result);

  } catch (error) {
    return handleError(error);
  }
}