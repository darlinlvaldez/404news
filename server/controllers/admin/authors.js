import bcrypt from "bcrypt";
import authors from "@/server/models/admin/authors";

const authorsController = {};

authorsController.getAll = async () => {
  try {
    return await authors.getAll();
  } catch (error) {
    console.error("Error getting authors:", error);
    throw new Error("Error fetching authors");
  }
};

authorsController.getById = async (id) => {
  try {
    return await authors.getById(id);
  } catch (error) {
    console.error("Error getting author:", error);
    throw new Error("Error fetching author");
  }
};

authorsController.create = async (data) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    const userData = {
      username: data.username,
      email: data.email,
      password: hashedPassword,
      role: data.role || "author",
      active: data.active ?? 1
    };

    const authorData = {
      name: data.name,
      bio: data.bio,
      slug: data.slug,
      avatar: data.avatar
    };

    return await authors.create(authorData, userData);

  } catch (error) {
    console.error("Error creating author:", error);
    throw new Error("Error creating author");
  }
};

authorsController.update = async (id, data) => {
  try {
    const updatedUserData = {};
    if (data.username) updatedUserData.username = data.username;
    if (data.email) updatedUserData.email = data.email;
    if (data.password) updatedUserData.password = await bcrypt.hash(data.password, 10);
    if (data.role) updatedUserData.role = data.role;
    if (data.active !== undefined) updatedUserData.active = data.active;
    if (Object.keys(updatedUserData).length > 0) updatedUserData.id = data.user_id;

    const updatedAuthorData = {};
    if (data.name) updatedAuthorData.name = data.name;
    if (data.bio) updatedAuthorData.bio = data.bio;
    if (data.slug) updatedAuthorData.slug = data.slug;
    if (data.avatar) updatedAuthorData.avatar = data.avatar;

    return await authors.update(id, updatedAuthorData, Object.keys(updatedUserData).length ? updatedUserData : null);

  } catch (error) {
    console.error("Error updating author:", error);
    throw new Error("Error updating author");
  }
};

authorsController.remove = async (id) => {
  try {
    return await authors.remove(id);
  } catch (error) {
    console.error("Error deleting author:", error);
    throw new Error("Error deleting author");
  }
};

export default authorsController;