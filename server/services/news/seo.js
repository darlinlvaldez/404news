import db from "../../lib/db";

const forSeo = {};

forSeo.getNews = async function () {
  const [rows] = await db.query(`
    SELECT slug, created_at, updated_at
    FROM news
    WHERE status = 'published'
    ORDER BY created_at DESC
  `);

  return rows;
};

forSeo.getCategories = async function () {
  const [rows] = await db.query(`
    SELECT slug
    FROM categories
    WHERE active = 1
  `);

  return rows;
};

forSeo.getAuthors = async function () {
  const [rows] = await db.query(`
    SELECT slug
    FROM authors
  `);

  return rows;
};

export default forSeo;