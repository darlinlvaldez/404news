import newsController from "../../../../server/controllers/news/news";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = 10;
  const offset = (page - 1) * limit;

  const response = await newsController.searchNews(q, limit, offset);
  return new Response(JSON.stringify(response), { status: 200 });
}
