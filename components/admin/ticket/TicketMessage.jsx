import { formatDateTimeNumeric } from '@/utils/formatDate'

export default function TicketMessage({
  message,
  isOwnMessage = false
}) {
  const bubbleClass = isOwnMessage
    ? "bg-green-950/20 border-green-500/20 text-gray-200"
    : "bg-gray-950 border-gray-800 text-gray-300";

  return (
    <div className={`flex flex-col ${isOwnMessage ? "items-end" : "items-start"}`}>
      <div className={`max-w-[85%] rounded-2xl p-4.5 border shadow-md transition-all duration-150 ${bubbleClass}`}>
        <div className="flex items-center justify-between gap-8 mb-2.5 border-b border-gray-800/40 pb-2">
          <div className="flex items-center space-x-2">

            <div className="w-7 h-7 rounded-lg bg-green-950/60 text-green-400 border border-green-500/20 flex items-center justify-center font-bold text-xs">
              {message.sender_name.substring(0,2).toUpperCase()}
            </div>

            <div>
              <span className="text-xs font-bold text-white flex items-center gap-1">
                {message.author}

                {message.sender_type === "admin" && (
                  <span className="bg-green-950/80 text-green-400 border border-green-500/20 text-[8px] uppercase tracking-wider px-1 rounded font-black">
                    Admin
                  </span>
                )}
              </span>
            </div>

          </div>

          <span className="text-[9px] text-gray-500 font-mono">
            {formatDateTimeNumeric(message.created_at)}
          </span>
        </div>


        <p className="text-sm leading-relaxed whitespace-pre-line font-medium pl-1">
          {message.message}
        </p>
      </div>
    </div>
  );
}