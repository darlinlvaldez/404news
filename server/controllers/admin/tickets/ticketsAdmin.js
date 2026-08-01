import tickets from "@/server/models/admin/tickets/ticketsAdmin";
import {getAuthors} from "@/server/services/admin/catalog";

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

ticketsAdmin.create = async ({
  userId,
  senderId,
  type,
  subject,
  message,
  priority,
  attachments = [],
}) => {
  if (!userId) {
    throw new Error("Debes seleccionar un autor");
  }

  return await tickets.createTicket({
    userId,
    senderId,
    type,
    subject,
    message,
    priority,
    attachments,
  });
};

ticketsAdmin.getAuthorsForSelect = async () => {
  return await getAuthors();
};

export default ticketsAdmin;