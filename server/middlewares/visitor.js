import { NextResponse } from "next/server";

export function visitor(request) {

  const visitorId = request.cookies.get("visitor_id");

  if (!visitorId) {

    const response = NextResponse.next();

    response.cookies.set(
      "visitor_id",
      crypto.randomUUID(),
      {
        maxAge: 60 * 60 * 24 * 365,
        httpOnly: true,
        sameSite: "lax"
      }
    );

    return response;
  }

  return NextResponse.next();
}