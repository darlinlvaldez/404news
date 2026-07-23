import ticketAuthorModels from "@/server/models/admin/ticketChatAuthor";
import ticketMessages from "@/server/models/admin/ticketMessages";

const ticketChatAuthor = {};

ticketChatAuthor.ticket = async ({ id, userId}) => {
  const ticket = await ticketAuthorModels.ticket(id, userId);
  const messages = await ticketAuthorModels.messages(id, userId);

  return {ticket, messages} 
}; 

ticketChatAuthor.create = async ({
  id,
  userId,
  senderId,
  senderType,
  message
}) => {

  return await ticketAuthorModels.create({
    ticketId: id,
    userId,
    senderId,
    senderType,
    message
  });
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

export default ticketChatAuthor;