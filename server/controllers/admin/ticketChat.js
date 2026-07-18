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

export default ticketChat;