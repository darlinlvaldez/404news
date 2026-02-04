import { NextResponse } from "next/server";
import news from "../../../../../controllers/news/news";

export async function GET(req, { params }) {
  const { slug } = params;
  const result = await news.fetchByCategory(slug);
  return NextResponse.json(result);
}