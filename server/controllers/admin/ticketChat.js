import ticketModels from "@/server/models/admin/ticketChat";

const ticketChat = {};

ticketChat.ticket = async ({ id }) => {
  const ticket = await ticketModels.ticket(id);
  const messages = await ticketModels.messages(id);

  return {ticket, messages} 
}; 

ticketChat.update = async ({ id, status, priority }) => {
  await ticketModels.update(id, {
      status,
      priority
  });
};

ticketChat.create = async ({
  id,
  senderId,
  senderType,
  message,
  isInternal
}) => {
  return await ticketModels.create({
    ticketId: id,
    senderId,
    message,
    senderType,
    isInternal
  });
};

export default ticketChat;