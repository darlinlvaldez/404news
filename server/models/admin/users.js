import db from "@/server/lib/db";

const users = {};

users.getAll = async () => {
  const [rows] = await db.query(
    `SELECT id, username, email, role, active, created_at 
    FROM users 
    WHERE role != 'author' 
    ORDER BY created_at DESC`
  );
  return rows;
};

users.getById = async (id) => {
  const [rows] = await db.query(
    "SELECT id, username, email, role, active FROM users WHERE id = ? AND role != 'author'",
    [id]
  );
  return rows[0];
};

users.create = async (data) => {
  const { username, email, password, role } = data;

  const [result] = await db.query(
    "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
    [username, email, password, role]
  );

  return { id: result.insertId };
};

users.update = async (id, data) => {
  const { username, email, role, active } = data;

  await db.query(
    "UPDATE users SET username=?, email=?, role=?, active=? WHERE id=?",
    [username, email, role, active, id]
  );

  return { success: true, message: "User updated successfully" };
};

users.remove = async (id) => {
  await db.query("DELETE FROM users WHERE id = ?", [id]);
  return {success: true, message: "User deleted successfully"};
};

export default users;