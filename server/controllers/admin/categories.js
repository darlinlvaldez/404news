import category from "@/server/models/admin/categories";
import {parseId} from "@/server/utils/parseId";

const categoryController = {};

categoryController.getAll = async () => {
  try {
    return await category.getAll();
  } catch (error) {
    console.error("Error getting categories:", error);
    throw new Error("Error fetching categories");
  }
};

categoryController.create = async (data) => {
  try {
    const { name, slug, active } = data;

    if (!name || !slug) {
      throw new Error("Name and slug are required");
    }

    const existing = await category.getBySlug(slug);
    if (existing) {
      throw new Error("Slug already exists");
    }

    return await category.create({ name, slug, active });
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

categoryController.update = async (id, data) => {
  try {
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
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};

categoryController.remove = async (id) => {
  try {
    const numericId = parseId(id);
    return await category.remove(numericId);
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};

export default categoryController;