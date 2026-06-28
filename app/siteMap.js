import config from "../config";

export default function sitemap() {
  return [
    {
      url: config.PORTAL,
      lastModified: new Date(),
    },
  ];
}