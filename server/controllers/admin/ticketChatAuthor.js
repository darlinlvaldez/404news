import ticketAuthorModels from "@/server/models/admin/ticketChat";

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

export default ticketChatAuthor;