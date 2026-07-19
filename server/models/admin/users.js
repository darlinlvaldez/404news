import db from "@/server/lib/db";

const users = {};

users.getAll = async (excludeUserId) => {
  const [rows] = await db.query(
    `SELECT id, username, name, email, role, active, created_at 
    FROM users 
    WHERE role != 'author' AND  id != ?
    ORDER BY created_at DESC`,
    [excludeUserId]
  );
  return rows;
};

users.getById = async (id) => {
  const [rows] = await db.query(
    "SELECT id, username, name, email, role, active FROM users WHERE id = ? AND role != 'author'",
    [id]
  );
  return rows[0];
};

users.create = async (data) => {
  const { username, name, email, password, role } = data;

  const [result] = await db.query(
    "INSERT INTO users (username, name, email, password, role) VALUES (?, ?, ?, ?, ?)",
    [username, name, email, password, role]
  );

  return { id: result.insertId };
};

users.update = async (id, data) => {
  const { username, name, email, role, active } = data;

  await db.query(
    "UPDATE users SET username=?, name=?, email=?, role=?, active=? WHERE id=?",
    [username, name, email, role, active, id]
  );

  return { success: true, message: "User updated successfully" };
};

users.remove = async (id) => {
  await db.query("DELETE FROM users WHERE id = ?", [id]);
  return {success: true, message: "User deleted successfully"};
};

export default users;