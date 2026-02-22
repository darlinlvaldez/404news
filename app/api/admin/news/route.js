import { NextResponse } from "next/server";
import newsController from "@/server/controllers/admin/news";

export async function GET(request) {

  const { searchParams } = new URL(request.url);

  const limit = searchParams.get("limit") || 50;
  const offset = searchParams.get("offset") || 0;
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";

  const result = await newsController.newsTable({ limit, offset, search, status });

  return NextResponse.json(result);
}

export async function POST(req) {
  try {
    const body = await req.json();

    const result = await newsController.create(body);

    return NextResponse.json(result);

  } catch (error) {
    return NextResponse.json(
      { ok: false, message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}