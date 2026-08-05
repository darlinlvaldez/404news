import tickets from '@/server/models/admin/tickets/ticketsAuthor';

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