import { NextResponse } from "next/server";
import newsController from "@/server/controllers/admin/news";

export async function GET() {
  const result = await newsController.getFormData();
  return NextResponse.json(result);
}