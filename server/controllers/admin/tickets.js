import tickets from "@/server/models/admin/tickets";

const ticketsController = {};

ticketsController.ticketsTable = async ({
  limit = 50,
  offset = 0,
  search = "",
  status = "",
  priority = "",
  type = "",
}) => {
  return await tickets.getAll(
    limit,
    offset,
    search,
    status,
    priority,
    type
  );
};

ticketsController.ticketsTableMinimum = async ({
  limit = 10,
  offset = 0,
  search = "",
  status = "",
  userId,
}) => {
  return await tickets.getMinimum(
    limit,
    offset,
    search,
    status,
    userId
  );
};

export default ticketsController;