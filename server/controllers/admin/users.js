import users from "@/server/models/admin/users";
import bcrypt from "bcrypt";

const usersController = {};

usersController.getAll = async () => {
  return await users.getAll();
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

usersController.update = async (id, data) => {
  const updatedData = { ...data };

  if (data.password) {
    const saltRounds = 10;
    updatedData.password = await bcrypt.hash(data.password, saltRounds);
  }

  return await users.update(id, updatedData);
};

usersController.remove = async (id) => {
  return await users.remove(id);
};

export default usersController;