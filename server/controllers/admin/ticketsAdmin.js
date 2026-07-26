import tickets from "@/server/models/admin/ticketsAdmin";

const ticketsAdmin = {};

ticketsAdmin.ticketsTable = async ({
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

export default ticketsAdmin;