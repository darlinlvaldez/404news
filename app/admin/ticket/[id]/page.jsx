"use client"

import { useState, useEffect } from 'react';
import { useParams } from "next/navigation";
import { useRouter } from 'next/navigation';
import { Header } from '@/components/admin/Header';
import { formatDateRelative, formatDateTimeNumeric } from '@/utils/formatDate'
import TicketMessage from "@/components/admin/ticket/TicketMessage";
import ActionDropdown from "@/components/admin/ui/ActionDropdown";
import { 
  getStatusStyle, 
  getStatusIcon, 
  getPriorityStyle, 
  getPriorityIcon, 
  statusOptions, 
  priorityOptions } 
  from '@/utils/ticketConfig';

import { 
  Send, 
  Mail, 
  Calendar, 
  AlertCircle, 
  CheckCircle, 
  ArrowLeftRight, 
  MessageSquare,
  CircleDot,
  CircleCheckBig
} from 'lucide-react';

export default function TicketChat() {
  const router = useRouter();

  const [ticket, setTicket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newResponse, setNewResponse] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const loadTicket = async () => {
      try {
        const response = await fetch(`/api/admin/tickets/${id}`);

        if (!response.ok) {
          throw new Error("Error al cargar el ticket");
        }

        const data = await response.json();

        setTicket(data.ticket);
        setMessages(prev => [...prev, data.message]);

      } catch (error) {
        console.error(error);
      }
    };

    loadTicket();
  }, [id]);

  const handleTicketChange = async (name, value) => {
    try {
      const response = await fetch(`/api/admin/tickets/${ticket.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            [name]: value
        }),
      });

      if (!response.ok) {
        throw new Error();
      }

      setTicket(prev => ({
        ...prev,
        [name]: value
      }));

    } catch (err) {
      console.error(err);
    }
  };

  const createLabels = (options) =>
  Object.fromEntries(
    options
      .filter(option => option.value)
      .map(option => [option.value, option.label])
  );

  const statusLabels = createLabels(statusOptions);
  const priorityLabels = createLabels(priorityOptions);

  const handleSendResponse = async (e) => {
    e.preventDefault();

    if (!newResponse.trim()) return;

    try {

      const response = await fetch(`/api/admin/tickets/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: newResponse
        })
      });

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();

      setMessages(data.messages);

      setNewResponse("");

    } catch (err) {
      console.error(err);
    }
  };

  const onBack = () => {
    router.push('/admin/tickets');
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
                #{ticket.id}
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

              <div className="bg-gray-900/60 p-3 rounded-xl border border-gray-800">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block mb-1.5">
                  Prioridad
                </span>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-wider border ${getPriorityStyle(ticket.priority)}`}>
                  {getPriorityIcon(ticket.priority)}  
                  {priorityLabels[ticket.priority] ?? ticket.priority}
                </span>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest block border-b border-gray-800/40 pb-1">
                Información del Remitente
              </span>

              <div className="flex items-center space-x-3 bg-gray-900/40 p-3 rounded-xl border border-gray-800/60">
                <div className="w-10 h-10 rounded-xl bg-green-950 text-green-400 border border-green-500/30 flex items-center justify-center font-black text-sm">
                  {ticket.sender_name.split(' ').slice(0,2).map(n => n[0]).join('')}
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 font-bold uppercase block">Nombre</span>
                  <span className="text-sm font-bold text-white block">{ticket.sender_name}</span>
                </div>
              </div>

              <div className="space-y-3 pl-1">
                <div className="flex items-center space-x-3 text-xs">
                  <Mail className="w-4 h-4 text-gray-500 shrink-0" />
                  <div className="overflow-hidden">
                    <span className="text-gray-500 block text-[9px] uppercase font-bold">Correo Electrónico</span>
                    <span className="text-gray-300 font-mono truncate block">{ticket.email}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-xs">
                  <Calendar className="w-4 h-4 text-gray-500 shrink-0" />
                  <div>
                    <span className="text-gray-500 block text-[9px] uppercase font-bold">Ultima Actividad</span>
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
                Este ticket es una consulta de <span className="text-white font-semibold">Soporte Técnico</span>. Asegúrate de actualizar el estado del ticket para mantener al usuario al tanto de tu investigación.
              </p>
            </div>
          </div>
        </aside>

        <main className="flex-1 flex flex-col overflow-hidden bg-gray-900">
          
          <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-6">
            
            <div className="space-y-2">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block">
                Mensaje Inicial
              </span>
              <div className="bg-gray-950/80 border border-gray-800 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-end border-b border-gray-900 pb-3 mb-3">
                  <span className="text-xs  text-gray-500 font-mono">
                    {formatDateTimeNumeric(ticket.created_at)}
                  </span>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line font-medium pl-1">
                  {ticket.message}
                </p>
              </div>
            </div>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-gray-900 px-4 text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-green-500" /> Respuestas 
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-4">
                  {messages?.map((message) => (
                    <TicketMessage
                      key={message.id}
                      message={message}
                      isOwnMessage={message.sender_type === "admin"}
                    />
                  ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-950 border-t border-gray-800 p-6 space-y-4 shrink-0">
            <div className="flex flex-wrap items-center gap-3">

              <ActionDropdown
                icon={ArrowLeftRight}
                name="status"
                options={statusOptions}
                getIcon={getStatusIcon}
                onChange={(e) => handleTicketChange(e.target.name, e.target.value)}
              />
              <ActionDropdown
                icon={AlertCircle}
                name="priority"
                options={priorityOptions}
                getIcon={getPriorityIcon}
                onChange={(e) => handleTicketChange(e.target.name, e.target.value)}
              />

              {ticket.status !== 'closed' ? (
                <button onClick={() => handleTicketChange("status", "closed")}
                  className="px-4 py-2 bg-red-950/40 hover:bg-red-900/40 border border-red-500/20 hover:border-red-500/40 text-red-400 font-bold text-xs rounded-xl transition duration-150 flex items-center gap-1.5 active:scale-95 cursor-pointer ml-auto"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  Cerrar ticket
                </button>
              ) : (
                <span className="text-xs text-gray-500 font-bold italic ml-auto flex items-center gap-1.5 bg-gray-900 px-3 py-1.5 rounded-lg border border-gray-800">
                  <CircleCheckBig className="w-3.5 h-3.5" />
                  Ticket ya cerrado
                </span>
              )}
            </div>

            <form onSubmit={handleSendResponse} className="relative">
              <div className="flex flex-col space-y-2">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest block pl-1">
                  Escribir respuesta
                </span>
                
                <div className="relative">
                  <textarea
                    rows="3"
                    value={newResponse}
                    onChange={(e) => setNewResponse(e.target.value)}
                    placeholder="Escribe aquí tu respuesta para resolver la incidencia de Darlin..."
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-800 focus:border-green-600 focus:ring-1 focus:ring-green-600 focus:outline-none rounded-2xl text-sm font-medium text-gray-200 placeholder-gray-600 resize-none pr-14 shadow-inner"
                  ></textarea>

                  <button
                    type="submit"
                    disabled={!newResponse.trim()}
                    className="absolute right-3.5 bottom-4 p-2.5 bg-green-700 hover:bg-green-600 disabled:opacity-20 disabled:hover:bg-green-700 text-white rounded-xl transition-all duration-200 shadow-md flex items-center justify-center active:scale-95 cursor-pointer"
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