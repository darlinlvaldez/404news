import tickets from '@/server/models/admin/ticketsAuthor';

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
  message
}) => {

  const ticketId = await tickets.createTicket({
    userId,
    subject,
    message
  });

  return ticketId;
};

export default ticketsAuthor