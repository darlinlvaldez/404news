import db from "@/server/lib/db";

const authors = {};

authors.getAll = async () => {
  const [rows] = await db.query(
    `SELECT a.*, u.email, u.username, u.role, u.active
     FROM authors a
     JOIN users u ON a.user_id = u.id`
  );
  return rows;
};

authors.getById = async (id) => {
  const [rows] = await db.query(
    `SELECT a.*, u.email, u.username, u.role, u.active
     FROM authors a
     JOIN users u ON a.user_id = u.id
     WHERE a.id = ?`,
    [id]
  );
  return rows[0];
};

authors.create = async (authorData, userData) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    const [userResult] = await conn.query(
      "INSERT INTO users (username, email, password, role, active) VALUES (?, ?, ?, ?, ?)",
      [userData.username, userData.email, userData.password, userData.role, userData.active]
    );

    const userId = userResult.insertId;

    const [authorResult] = await conn.query(
      "INSERT INTO authors (name, bio, slug, avatar, user_id) VALUES (?, ?, ?, ?, ?)",
      [authorData.name, authorData.bio, authorData.slug, authorData.avatar, userId]
    );

    await conn.commit();
    return { id: authorResult.insertId, user_id: userId, ...authorData, ...userData };
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};

authors.update = async (id, authorData, userData) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    if (userData) {
      const userFields = Object.keys(userData).map(k => `${k} = ?`).join(", ");
      const userValues = Object.values(userData);
      userValues.push(userData.id);
      await conn.query(`UPDATE users SET ${userFields} WHERE id = ?`, userValues);
    }

    if (authorData) {
      const authorFields = Object.keys(authorData).map(k => `${k} = ?`).join(", ");
      const authorValues = Object.values(authorData);
      authorValues.push(id);
      await conn.query(`UPDATE authors SET ${authorFields} WHERE id = ?`, authorValues);
    }

    await conn.commit();

    return await authors.getById(id);
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};

authors.remove = async (id) => {
  const author = await authors.getById(id);
  if (!author) throw new Error("Author not found");

  await db.query("DELETE FROM users WHERE id = ?", [author.user_id]); 
  return { deletedId: id };
};

export default authors;