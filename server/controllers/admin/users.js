import users from "@/server/models/admin/users";
import bcrypt from "bcrypt";

const usersController = {};

usersController.getAll = async (excludeUserId) => {
  return await users.getAll(excludeUserId);
};

usersController.getById = async (id) => {
  return await users.getById(id);
};

usersController.create = async (data) => {
  const saltRounds = 10;

  const hashedPassword = await bcrypt.hash(data.password, saltRounds);

  const userData = {
    ...data,
    password: hashedPassword,
  };

  return await users.create(userData);
};

usersController.update = async (id, data, currentUserId) => {

  if (id === currentUserId) {
    throw new Error("CANNOT_MODIFY_OWN_ACCOUNT");
  }
  
  const updatedData = { ...data };

  if (data.password) {
    const saltRounds = 10;
    updatedData.password = await bcrypt.hash(data.password, saltRounds);
  }

  return await users.update(id, updatedData);
};

usersController.remove = async (id, currentUserId) => {

  if (id === currentUserId) {
    throw new Error("CANNOT_MODIFY_OWN_ACCOUNT");
  }
  
  return await users.remove(id);
};

export default usersController;