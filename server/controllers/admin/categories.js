import category from "@/server/models/admin/categories";
import { parseId } from "@/server/utils/parseId";

const categoryController = {};

categoryController.getAll = async () => {
  return await category.getAll();
};

categoryController.create = async (data) => {
  const { name, slug, active } = data;

  if (!name || !slug) {
    throw new Error("Name and slug are required");
  }

  const existing = await category.getBySlug(slug);
  if (existing) {
    throw new Error("Slug already exists");
  }

  return await category.create({ name, slug, active });
};

categoryController.update = async (id, data) => {
  const numericId = parseId(id);

  const { name, slug, active } = data;

  if (!name || !slug) {
    throw new Error("Name and slug are required");
  }

  const existing = await category.getBySlug(slug);

  if (existing && existing.id !== numericId) {
    throw new Error("Slug already in use");
  }

  return await category.update(numericId, { name, slug, active });
};

categoryController.remove = async (id) => {
  const numericId = parseId(id);
  return await category.remove(numericId);
};

export default categoryController;
