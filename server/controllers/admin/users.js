import users from "@/server/models/admin/users";

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
    return await users.create(data);
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Error creating user");
  }
};

usersController.update = async (id, data) => {
  try {
    return await users.update(id, data);
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