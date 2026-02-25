import { NextResponse } from "next/server";
import newsController from "@/server/controllers/admin/news";
import { requireAuth } from "@/server/utils/auth";
import { handleError } from "@/server/utils/handleError";

export async function GET(request) {
  try {
    await requireAuth(request, ["superadmin", "admin", "editor"]);

    const result = await newsController.getFormData();

    return NextResponse.json(result);

  } catch (error) {
    return handleError(error);
  }
}