import bcrypt from "bcrypt";
import authors from "@/server/models/admin/authors";

const authorsController = {};

const generateUsername = (name) => {
  return name
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "");
};

authorsController.getAll = async () => {
  return await authors.getAll();
};

authorsController.getById = async (id) => {
  return await authors.getById(id);
};

authorsController.create = async (data) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(data.password, saltRounds);

  const username = generateUsername(data.name);

  const userData = {
    username,
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
  const username = generateUsername(data.name);

  const userData = {
    username,
    email: data.email,
    role: "author",
    active: data.active,
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