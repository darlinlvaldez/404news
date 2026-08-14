import ticketAdminModels from "@/server/models/admin/tickets/ticketChatAdmin";
import ticketMessages from "@/server/models/ticketMessages";

const ticketChatAdmin = {};

ticketChatAdmin.ticket = async ({ id }) => {
  return await ticketAdminModels.ticket(id);
};

ticketChatAdmin.messages = async ({
  ticketId,
  limit,
  beforeId,
}) => {
  return await ticketAdminModels.messages(
    ticketId,
    limit,
    beforeId
  );
};

ticketChatAdmin.markReadAdmin = async ({
  ticketId,
}) => {
  return await ticketMessages.markReadAdmin(ticketId);
};

ticketChatAdmin.create = async ({
  id,
  senderId,
  senderType,
  message,
  isInternal,
  attachments = []
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
    attachments
  });
};

ticketChatAdmin.update = async ({ id, status, priority }) => {
  await ticketAdminModels.update(id, {
    status,
    priority
  });
};

export default ticketChatAdmin;