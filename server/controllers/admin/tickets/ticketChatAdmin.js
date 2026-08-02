import ticketAdminModels from "@/server/models/admin/tickets/ticketChatAdmin";
import ticketMessages from "@/server/models/admin/tickets/ticketMessages";

const ticketChatAdmin = {};

ticketChatAdmin.ticket = async ({ 
  id, 
  limit,
  beforeId
}) => {
    
  const ticket = await ticketAdminModels.ticket(id);

  const messages = await ticketAdminModels.messages(
    id, 
    limit,
    beforeId
  );

  return {ticket, messages} 
}; 

ticketChatAdmin.create = async ({
  id,
  senderId,
  senderType,
  message,
  isInternal,
  attachments = [],

}) => {

  if (senderType !== "admin") {
    isInternal = false;
  }

  return await ticketAdminModels.create({
    ticketId: id,
    senderId,
    message,
    senderType,
    isInternal,
    attachments = [],
  });
};

ticketChatAdmin.markReadAdmin = async ({
  ticketId,
}) => {
  return await ticketMessages.markReadAdmin(
    ticketId,
  );
};

ticketChatAdmin.update = async ({ id, status, priority }) => {
  await ticketAdminModels.update(id, {
    status,
    priority
  });
};

export default ticketChatAdmin;