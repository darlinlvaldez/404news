import { formatDateTimeNumeric } from '@/utils/formatDate'
import { Paperclip, FileText, Image as ImageIcon } from 'lucide-react'

function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function TicketMessage({
  message,
  isOwnMessage = false
}) {
  const bubbleClass = isOwnMessage
    ? "bg-green-950/20 border-green-500/20 text-gray-200"
    : "bg-gray-950 border-gray-800 text-gray-300";

  return (
    <div className={`flex flex-col ${isOwnMessage ? "items-end" : "items-start"}`}>
      <div className={`max-w-[50%] rounded-2xl p-4.5 border shadow-md transition-all duration-150 ${bubbleClass}`}>
        <div className="flex items-center justify-between gap-8 mb-2.5 border-b border-gray-800/40 pb-2">
          <div className="flex items-center space-x-2">
            <div>
              <span className="text-xs font-bold text-white flex items-center gap-1">
                {isOwnMessage
                  ? "Tú"
                  : message.sender_role === "author"
                    ? "Autor"
                    : "Administrador"}
              </span>
            </div>
          </div>

          <span className="text-xs text-gray-500 font-mono">
            {formatDateTimeNumeric(message.created_at)}
          </span>
        </div>

        {message.message && (
          <p className="text-sm leading-relaxed whitespace-pre-line wrap-break-word font-medium pl-1">
            {message.message}
          </p>
        )}

        {message.attachments?.length > 0 && (
          <div className={`space-y-1.5 ${message.message ? "mt-3" : ""}`}>
            {message.attachments.map((att) => (
              <a
                key={att.id}
                href={att.url}
                download={att.originalName}
                className="flex items-center gap-2 text-xs bg-black/20 border border-gray-800/60 rounded-lg px-3 py-2 hover:border-gray-700 transition-colors"
              >
                {att.mimeType?.startsWith("image/") ? (
                  <ImageIcon size={13} className="text-gray-400 shrink-0" />
                ) : (
                  <FileText size={13} className="text-gray-400 shrink-0" />
                )}

                <span className="truncate flex-1">
                  {att.originalName}
                </span> <Paperclip size={13} className="text-gray-400 shrink-0" />

                <span className="text-gray-500 shrink-0">
                  {formatFileSize(att.fileSize)}
                </span>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}