import { formatDateTimeNumeric } from '@/utils/formatDate'

export default function TicketMessage({
  message,
  isOwnMessage = false
}) {
  const bubbleClass = isOwnMessage
    ? "bg-green-950/20 border-green-500/20 text-gray-200"
    : "bg-gray-950 border-gray-800 text-gray-300";

    console.log(JSON.stringify(message.message));

  return (
    <div className={`flex flex-col ${isOwnMessage ? "items-end" : "items-start"}`}>
      <div className={`max-w-[50%] rounded-2xl p-4.5 border shadow-md transition-all duration-150 ${bubbleClass}`}>
        <div className="flex items-center justify-between gap-8 mb-2.5 border-b border-gray-800/40 pb-2">
          <div className="flex items-center space-x-2">

            <div>
              <span className="text-xs font-bold text-white flex items-center gap-1">
                {isOwnMessage ? "Tú" : "Administrador"}
              </span>
            </div>

          </div>

          <span className="text-xs  text-gray-500 font-mono">
            {formatDateTimeNumeric(message.created_at)}
          </span>
        </div>

        <p className="text-sm leading-relaxed whitespace-pre-line wrap-break-word  font-medium pl-1">
          {message.message}
        </p>
      </div>
    </div>
  );
}