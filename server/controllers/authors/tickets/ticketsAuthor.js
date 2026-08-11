import tickets from '@/server/models/authors/tickets/ticketsAuthor';
import {getTicketCategoryById} from "@/server/services/catalog";

const ticketsAuthor = {};

ticketsAuthor.ticketsTableMinimum = async ({
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

ticketsAuthor.create = async ({
  userId,
  subject,
  message,
  categoryId,
  attachments = [],
}) => {

  const category = await getTicketCategoryById(categoryId);

  if (!category) {
    throw new Error(
      "La categoría seleccionada no existe o no está activa"
    );
  }
  
  const { ticketId, messageId } = await tickets.createTicket({
    userId,
    subject,
    message,
    categoryId,
    attachments,
  });

  return { ticketId, messageId };
};

export default ticketsAuthor