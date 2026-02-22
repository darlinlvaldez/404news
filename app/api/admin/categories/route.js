import { NextResponse } from "next/server";
import categoryController from "@/server/controllers/admin/categories";

export async function GET() {
  const result = await categoryController.getAll();
  return NextResponse.json(result);
}

export async function POST(request) {
  const body = await request.json();
  const result = await categoryController.create(body);
  return NextResponse.json(result);
}