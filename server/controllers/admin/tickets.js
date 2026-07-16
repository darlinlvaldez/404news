import tickets from "@/server/models/admin/tickets";

const ticketsController = {};

ticketsController.ticketsTable = async ({
  limit = 50,
  offset = 0,
  search = "",
  status = "",
  type = "",
}) => {
  return await tickets.getAll(
    limit,
    offset,
    search,
    status,
    type
  );
};

export default ticketsController;