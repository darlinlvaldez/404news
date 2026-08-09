import tickets from "@/server/models/admin/tickets/ticketsAdmin";
import {getAuthors, getAuthorByUserId, getTicketCategoryById} from "@/server/services/catalog";

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
  categoryId,
  attachments = [],
}) => {

  const author = await getAuthorByUserId(userId);

  if (!author) {
    throw new Error("El autor seleccionado no existe o no está activo");
  }

  const category = await getTicketCategoryById(categoryId);

  if (!category) {
    throw new Error(
      "La categoría seleccionada no existe o no está activa"
    );
  }

  return await tickets.createTicket({
    userId,
    senderId,
    type,
    subject,
    message,
    priority,
    categoryId,
    attachments,
  });
};

ticketsAdmin.getAuthorsForSelect = async () => {
  return await getAuthors();
};

export default ticketsAdmin;