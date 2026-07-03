import bcrypt from "bcrypt";
import authors from "@/server/models/admin/authors";

const authorsController = {};

authorsController.getAll = async () => {
  return await authors.getAll();
};

authorsController.getById = async (id) => {
  return await authors.getById(id);
};

authorsController.create = async (data) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(data.password, saltRounds);

  const userData = {
    username: data.username,
    email: data.email,
    password: hashedPassword,
    role: data.role || "author",
    active: data.active ?? 1,
  };

  const authorData = {
    name: data.name,
    bio: data.bio,
    slug: data.slug,
    avatar: data.avatar,
  };

  return await authors.create(authorData, userData);
};

authorsController.update = async (id, data) => {
  const userData = {
    username: data.username,
    email: data.email,
    role: data.role,
    active: data.active,
    id: data.user_id,
  };

  if (data.password) {
    userData.password = await bcrypt.hash(data.password, 10);
  }

  const authorData = {
    name: data.name,
    bio: data.bio,
    slug: data.slug,
    avatar: data.avatar,
  };

  return await authors.update(id, authorData, userData);
};

authorsController.remove = async (id) => {
  return await authors.remove(id);
};

export default authorsController;
