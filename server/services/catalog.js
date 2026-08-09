import db from "@/server/lib/db.js";

export async function getAuthors() {
  const [rows] = await db.query(`
    SELECT
      a.id,
      a.user_id,
      a.name
    FROM authors a
    JOIN users u ON a.user_id = u.id
    WHERE u.active = 1
    ORDER BY a.name ASC
  `);

  return rows;
}

export async function getAuthorByUserId(userId) {
  const [rows] = await db.query(
    `
    SELECT
      a.id,
      a.user_id,
      a.name
    FROM authors a
    JOIN users u ON a.user_id = u.id
    WHERE a.user_id = ?
      AND u.active = 1
    LIMIT 1
    `,
    [userId]
  );

  return rows[0] || null;
}

export async function getCategories() {
  const [rows] = await db.query(`
    SELECT id, name
    FROM categories
    WHERE active = 1
    ORDER BY name ASC
  `);

  return rows;
}

export async function getTicketCategories() {
  const [rows] = await db.query(`
    SELECT id, name
    FROM ticket_categories
    WHERE active = 1
    ORDER BY id ASC
  `);

  return rows;
}

export async function getTicketCategoryById(categoryId) {
  const [rows] = await db.query(
    `
    SELECT
      id,
      name
    FROM ticket_categories
    WHERE id = ?
      AND active = 1
    LIMIT 1
    `,
    [categoryId]
  );

  return rows[0] || null;
}