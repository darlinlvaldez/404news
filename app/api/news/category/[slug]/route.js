import { NextResponse } from "next/server";
import news from "../../../../../server/controllers/news/news";

export async function GET(req, { params }) {
  const { slug } = await params;
  const result = await news.fetchByCategory(slug);
  return NextResponse.json(result);
}