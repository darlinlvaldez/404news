import db from "@/server/lib/db";

const category = {};

category.getAll = async function () {
  const [rows] = await db.query(`SELECT
    c.*,
    COUNT(n.id) AS news_count
    FROM categories c
    LEFT JOIN news n ON c.id = n.category_id
    GROUP BY c.id
    ORDER BY c.id DESC;`);

  return rows;
};

category.getBySlug = async function (slug) {
  const [rows] = await db.query(
    "SELECT id FROM categories WHERE slug = ? LIMIT 1",
    [slug],
  );

  return rows[0];
};

category.create = async function ({ name, slug, active }) {
  await db.query(
    "INSERT INTO categories (name, slug, active) VALUES (?, ?, ?)",
    [name, slug, active],
  );
  return { success: true };
};

category.update = async function (id, { name, slug, active }) {
  await db.query("UPDATE categories SET name=?, slug=?, active=? WHERE id=?", [
    name,
    slug,
    active,
    id,
  ]);
  return { success: true };
};

category.remove = async function (id) {
  await db.query("DELETE FROM categories WHERE id=?", [id]);
  return { success: true };
};

export default category;