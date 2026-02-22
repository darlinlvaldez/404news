export const parseId = (id) => {
  const numericId = Number(id);

  if (!Number.isInteger(numericId) || numericId <= 0) {
    throw new Error("Invalid ID");
  }

  return numericId;
};