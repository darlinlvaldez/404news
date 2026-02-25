import users from "@/server/models/admin/users";
import bcrypt from "bcrypt";

const usersController = {};

usersController.getAll = async () => {
  try {
    return await users.getAll();
  } catch (error) {
    console.error("Error getting users:", error);
    throw new Error("Error fetching users");
  }
};

usersController.getById = async (id) => {
  try {
    return await users.getById(id);
  } catch (error) {
    console.error("Error getting user:", error);
    throw new Error("Error fetching user");
  }
};

usersController.create = async (data) => {
  try {
    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    const userData = {
      ...data,
      password: hashedPassword
    };

    return await users.create(userData);

  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Error creating user");
  }
};

usersController.update = async (id, data) => {
  try {
    const updatedData = { ...data };

    if (data.password) {
      const saltRounds = 10;
      updatedData.password = await bcrypt.hash(data.password, saltRounds);
    }

    return await users.update(id, updatedData);

  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Error updating user");
  }
};

usersController.remove = async (id) => {
  try {
    return await users.remove(id);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Error deleting user");
  }
};

export default usersController;