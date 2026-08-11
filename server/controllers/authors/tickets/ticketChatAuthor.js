import ticketAuthorModels from "@/server/models/authors/tickets/ticketChatAuthor";
import ticketMessages from "@/server/models/ticketMessages";

const ticketChatAuthor = {};

ticketChatAuthor.ticket = async ({
  id,
  userId,
}) => {
  return await ticketAuthorModels.ticket(id, userId);
};

ticketChatAuthor.markReadAuthor = async ({
  ticketId,
  userId
}) => {
  return await ticketMessages.markReadAuthor(
    ticketId,
    userId
  );
};

ticketChatAuthor.messages = async ({
  id,
  userId,
  limit,
  beforeId,
}) => {
  return await ticketAuthorModels.messages(
    id,
    userId,
    limit,
    beforeId
  );
};

ticketChatAuthor.create = async ({
  id,
  senderId,
  senderType,
  message,
  attachments = [],
}) => {

  return await ticketAuthorModels.create({
    ticketId: id,
    senderId,
    senderType,
    message,
    attachments,
  });
};

export default ticketChatAuthor;