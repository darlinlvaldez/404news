import { NextResponse } from "next/server";
import news from "../../../server/controllers/news/news";

export async function GET() {
  const result = await news.fetchLatestNews();
  return NextResponse.json(result);
}