export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",
        "/news/search",
        ]
    },
    sitemap: "https://404news.up.railway.app/sitemap.xml",
  };
}