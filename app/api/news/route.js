import { NextResponse } from "next/server";
import news from "../../../controllers/news/news";

export async function GET() {
  const result = await news.fetchLatestNews();
  return NextResponse.json(result);
}