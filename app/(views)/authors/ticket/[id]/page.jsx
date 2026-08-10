"use client"

import { useState, useEffect } from 'react';
import { useParams } from "next/navigation";
import { useRouter } from 'next/navigation';
import { Header } from '@/components/admin/Header';
import { formatDateRelative, formatDateTimeNumeric } from '@/utils/formatDate'
import { toast } from "@/utils/toast";
import TicketMessage from "@/components/admin/ticket/TicketMessage";
import useFileUpload from "@/hooks/useFileUpload";
import AttachmentDropdown from "@/components/admin/ui/AttachmentDropdown";

import { 
  getStatusStyle, 
  getStatusIcon, 
  statusOptions, 
} from '@/utils/ticketConfig';

import { 
  Send, 
  Calendar,  
  MessageSquare,
  CircleDot,
  Paperclip
} from 'lucide-react';

export default function TicketChat() {
  const router = useRouter();

  const [ticket, setTicket] = useState(null);
  const [messages, setMessages] = useState(null);
  const [newResponse, setNewResponse] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sending, setSending] = useState(false);

  const { files, handleFileChange, removeFile,  clearFiles } = useFileUpload();

  const { id } = useParams();

  useEffect(() => {
    const loadTicket = async () => {
      try {
        const [ticketResponse, messagesResponse] = await Promise.all([
          fetch(`/api/authors/tickets/${id}`),
          fetch(`/api/authors/tickets/${id}/messages?limit=5`),
        ]);

        if (!ticketResponse.ok || !messagesResponse.ok) {
          throw new Error();
        }

        const ticketData = await ticketResponse.json();
        const messagesData = await messagesResponse.json();

        setTicket(ticketData.ticket);
        setMessages(ticketData.messages);
        setCurrentUserId(ticketData.session.id);
        setMessages(messagesData.messages);
        setHasMoreMessages(messagesData.messages.length === 5);

        if (messagesData.messages.length < 5) {
          setHasMoreMessages(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadTicket();
  }, [id]);

  const createLabels = (options) =>
  Object.fromEntries(
    options
      .filter(option => option.value)
      .map(option => [option.value, option.label])
  );

  const statusLabels = createLabels(statusOptions);

  const handleSendResponse = async (e) => {
    e.preventDefault();

    if (!newResponse.trim() && files.length === 0) return;

    try {
      setSending(true);

      const formData = new FormData();
      formData.append("message", newResponse);

      files.forEach((file) => {
        formData.append("files", file);
      });

      const response = await fetch(`/api/authors/tickets/${id}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();

      setMessages((prev) => [...prev, data.message]);

      setNewResponse("");
      clearFiles();

    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  const isClosed = ticket?.status === "closed";

  const loadMoreMessages = async () => {

    if (!messages?.length || loadingMessages) return;

    try {

      setLoadingMessages(true);

      const oldestMessage = messages[0];

      const response = await fetch(
        `/api/authors/tickets/${id}/messages?limit=5&beforeId=${oldestMessage.id}`
      );

      const data = await response.json();

      if(data.messages.length < 5){
        setHasMoreMessages(false);
      }

      setMessages(prev => [
        ...data.messages,
        ...prev
      ]);

    } catch(error){
      console.error(error);
    } finally {
      setLoadingMessages(false);
    }
  };

  const onBack = () => {
    router.push('/authors/tickets');
  };

  if (!ticket) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="h-screen w-full flex flex-col bg-gray-950 text-gray-200 font-sans overflow-hidden">
      
      <Header onBack={onBack}>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-green-950/60 text-green-700 rounded-2xl border border-green-500/30">
            <MessageSquare className="w-6 h-6" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <Header.Title>Detalles del Ticket</Header.Title>
              <span className="text-sm font-mono text-gray-500">
                #{ticket.ticket_number}
              </span>
            </div>

            <Header.Subtitle>
              Consola de Mensajería y Soporte Directo
            </Header.Subtitle>
          </div>
          
          <div className="flex items-center ml-auto gap-2 bg-gray-950/60 border border-gray-800 px-4 py-2 rounded-xl">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-sm font-bold text-gray-400">
              Canal Activo de Respuestas
            </span>
          </div>
        </div>
      </Header>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden bg-gray-900">
        
        <aside className="w-full lg:w-90 bg-gray-950 border-r border-gray-800/80 p-6 flex flex-col justify-between overflow-y-auto shrink-0 space-y-6">
          <div className="space-y-6">
            
            <div className="pb-4 border-b border-gray-800/60">
              <span className="text-[10px] text-green-500 font-bold uppercase tracking-widest block mb-1">
                Asunto del Ticket
              </span>
              <h2 className="text-lg font-extrabold text-white leading-tight">
                {ticket.subject}
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-900/60 p-3 rounded-xl border border-gray-800">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block mb-1.5">
                  Estado
                </span>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-wider border ${getStatusStyle(ticket.status)}`}>
                  {getStatusIcon(ticket.status)}
                  {statusLabels[ticket.status] ?? ticket.status}
                </span>
              </div>

            </div>

            <div className="space-y-4 pt-2">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest block border-b border-gray-800/40 pb-1">
                Ultima Actividad
              </span>

              <div className="space-y-3 pl-1">
                <div className="flex items-center space-x-3 text-xs">
                  <Calendar className="w-4 h-4 text-gray-500 shrink-0" />
                  <div>
                    <span className="text-gray-300 font-mono block">{formatDateRelative(ticket.last_reply_at)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest block border-b border-gray-800/40 pb-1">
                Administrador responsable
              </span>
              <span className="text-gray-300 text-xs font-mono block">
                {ticket.assigned_name ?? "Sin asignar"}
              </span>            
            </div>

            {ticket.closed_at && (
              <div className="pt-2">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest block border-b border-gray-800/40 pb-1">
                  Cierre del ticket
                </span>
                <span className="text-gray-300 text-xs font-mono block">
                  {formatDateTimeNumeric(ticket.closed_at)}
                </span>            
              </div>
            )}
          </div>

          <div className="bg-green-950/10 border border-green-900/30 p-4 rounded-xl">
            <div className="flex gap-2.5">
              <CircleDot className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <p className="text-[11px] text-gray-400 leading-relaxed">
                Este ticket ha sido recibido por nuestro equipo de 
                <span className="text-white font-semibold">Soporte Técnico</span>. 
                Podrás seguir las respuestas y el estado de tu solicitud desde este chat.
              </p>
            </div>
          </div>
        </aside>

        <main className="flex-1 flex flex-col overflow-hidden bg-gray-900">
          
          <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-6">
            {hasMoreMessages && (
              <button
                onClick={loadMoreMessages}
                disabled={loadingMessages}
                className="w-full py-2 text-xs font-bold text-gray-400 rounded-xl transition-colors 
                duration-200 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loadingMessages ? "Cargando..." : "Cargar mensajes anteriores"}
              </button>
            )}

            <div className="space-y-4">
              {messages?.map((message) => (
                <TicketMessage
                  key={message.id}
                  message={message}
                  isOwnMessage={message.sender_id === currentUserId}
                />
              ))}
            </div>
          </div>

          <div className="bg-gray-950 border-t border-gray-800 p-6 space-y-4 shrink-0">
            <form onSubmit={handleSendResponse} className="relative">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between pl-1">
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest block pl-1">
                    Escribir respuesta
                  </span>
                  
                  <AttachmentDropdown
                    files={files}
                    onRemove={removeFile}
                  />
                </div>
                
                <div className="relative">
                  <textarea
                    rows="3"
                    value={newResponse}
                    disabled={isClosed}
                    onChange={(e) => setNewResponse(e.target.value)}
                    placeholder={isClosed ? "Este ticket está cerrado." : "Escribe aquí tu respuesta..."}
                    className="w-full disabled:cursor-not-allowed disabled:opacity-60 px-4 py-3 bg-gray-900 border border-gray-800 focus:border-green-600 focus:ring-1 focus:ring-green-600 focus:outline-none rounded-2xl text-sm font-medium text-gray-200 placeholder-gray-600 resize-none pr-24 shadow-inner"
                  ></textarea>

                  <input
                    type="file"
                    multiple
                    accept="image/*,.pdf,.txt"
                    disabled={isClosed}
                    className="hidden"
                    id="reply-files"
                    onChange={(e) => {
                      const exceeded = handleFileChange(e);

                      if (exceeded) {
                        toast.warning(
                          "Límite de archivos",
                          "Solo puedes adjuntar un máximo de 10 archivos por mensaje"
                        );
                      }
                    }}
                  />

                  <label
                    htmlFor="reply-files"
                    className={`absolute right-14 bottom-4 p-2.5 rounded-xl transition-all duration-200 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 
                      ${isClosed ? "opacity-20 cursor-not-allowed pointer-events-none" : "cursor-pointer"}`}
                  >
                    <Paperclip className="w-4 h-4" />
                  </label>

                  <button
                    type="submit"
                    disabled={isClosed || sending || (!newResponse.trim() && files.length === 0)}
                    className="absolute disabled:cursor-not-allowed right-3.5 bottom-4 p-2.5 bg-green-700 hover:bg-green-600 disabled:opacity-20 disabled:hover:bg-green-700 text-white rounded-xl transition-all duration-200 shadow-md flex items-center justify-center active:scale-95 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}