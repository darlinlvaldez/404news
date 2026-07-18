import ticketModels from "@/server/models/admin/ticketChat";

const ticketChat = {};

ticketChat.ticket = async ({ id }) => {
  const ticket = await ticketModels.ticket(id);
  const messages = await ticketModels.messages(id);

  return {ticket, messages} 
};

export default ticketChat;
