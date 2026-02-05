import { NextResponse } from "next/server";
import news from "../../../../../controllers/news/news";

export async function GET(request, { params }) {
  const { slug } = await params;

  const result = await news.fetchDetailNews(slug);
  return NextResponse.json(result);
}
