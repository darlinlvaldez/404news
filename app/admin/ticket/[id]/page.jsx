"use client"

import { useState, useEffect } from 'react';
import { useParams } from "next/navigation";
import { useRouter } from 'next/navigation';
import { Header } from '@/components/admin/Header';
import { formatDateRelative, formatDateAbsolute } from '@/utils/formatDate'
import { getStatusStyle, getStatusIcon, getPriorityStyle, getPriorityIcon } from '@/utils/ticketConfig';

import { 
  Send, 
  Mail, 
  Calendar, 
  AlertCircle, 
  CheckCircle, 
  ArrowLeftRight, 
  MessageSquare,
  CircleDot,
} from 'lucide-react';

export default function TicketChat() {
  const router = useRouter();

  const [ticket, setTicket] = useState(null);
  const [messages, setMessages] = useState(null);


  const { id } = useParams();

  useEffect(() => {
    const loadTicket = async () => {
      try {
        const response = await fetch(`/api/admin/tickets/${id}`);

        if (!response.ok) {
          throw new Error("Error al cargar el ticket");
        }

        const data = await response.json();
        console.log(data);


        setTicket(data.ticket);
        setMessages(data.messages);

      } catch (error) {
        console.error(error);
      }
    };

    loadTicket();
  }, [id]);

  // Estado para la nueva respuesta a escribir
  const [nuevaRespuesta, setNuevaRespuesta] = useState("");
  
  // Controles de estado para modales o dropdowns inline
  const [mostrandoCambioEstado, setMostrandoCambioEstado] = useState(false);
  const [mostrandoCambioPrioridad, setMostrandoCambioPrioridad] = useState(false);

  const obtenerEstiloEstado = (estado) => {
    switch (estado) {
      case 'Abierto':
        return 'bg-emerald-950/60 text-emerald-400 border-emerald-500/30';
      case 'En proceso':
        return 'bg-amber-950/60 text-amber-400 border-amber-500/30';
      case 'Cerrado':
        return 'bg-gray-800 text-gray-400 border-gray-700';
      default:
        return 'bg-gray-800 text-gray-400 border-gray-700';
    }
  };

  const obtenerEmojiEstado = (estado) => {
    switch (estado) {
      case 'Abierto': return '🟢';
      case 'En proceso': return '🟡';
      case 'Cerrado': return '⚫';
      default: return '⚪';
    }
  };

  const obtenerEstiloPrioridad = (prioridad) => {
    switch (prioridad) {
      case 'Alta':
        return 'bg-rose-950/60 text-rose-400 border-rose-500/30';
      case 'Media':
        return 'bg-amber-950/60 text-amber-400 border-amber-500/30';
      case 'Baja':
        return 'bg-emerald-950/40 text-emerald-500 border-emerald-500/20';
      default:
        return 'bg-gray-800 text-gray-400 border-gray-700';
    }
  };

  const handleEnviarRespuesta = (e) => {
    e.preventDefault();
    if (!nuevaRespuesta.trim()) return;

    const nuevaRes = {
      id: Date.now(),
      autor: "Admin", // Simulamos responder como administrador
      rol: "admin",
      avatar: "A",
      mensaje: nuevaRespuesta,
      fecha: "Hoy mismo - Hace unos instantes"
    };

    setTicket({
      ...ticket,
      respuestas: [...ticket.respuestas, nuevaRes]
    });
    setNuevaRespuesta("");
  };

  const cambiarEstado = (nuevoEstado) => {
    setTicket({
      ...ticket,
      estado: nuevoEstado
    });
    setMostrandoCambioEstado(false);
  };

  const cambiarPrioridad = (nuevaPrioridad) => {
    setTicket({
      ...ticket,
      prioridad: nuevaPrioridad
    });
    setMostrandoCambioPrioridad(false);
  };

  const cerrarTicket = () => {
    setTicket({
      ...ticket,
      estado: "Cerrado"
    });
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

      {/* ÁREA CENTRAL CON LAYOUT DE DOS COLUMNAS */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden bg-gray-900">
        
        {/* COLUMNA IZQUIERDA: DETALLES DEL TICKET (METADATOS) */}
        {}
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

            {/* Fichas de Estado y Prioridad */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-900/60 p-3 rounded-xl border border-gray-800">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block mb-1.5">
                  Estado
                </span>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-wider border ${getStatusStyle(ticket.status)}`}>
                   {getStatusIcon(ticket.status)}
                    {ticket.status.replace("_", " ")}
                </span>
              </div>

              <div className="bg-gray-900/60 p-3 rounded-xl border border-gray-800">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block mb-1.5">
                  Prioridad
                </span>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-wider border ${getPriorityStyle(ticket.priority)}`}>
                  {getPriorityIcon(ticket.priority)} {ticket.priority}
                </span>
              </div>
            </div>

            {/* Datos del Remitente */}
            <div className="space-y-4 pt-2">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest block border-b border-gray-800/40 pb-1">
                Información del Remitente
              </span>

              <div className="flex items-center space-x-3 bg-gray-900/40 p-3 rounded-xl border border-gray-800/60">
                <div className="w-10 h-10 rounded-xl bg-green-950 text-green-400 border border-green-500/30 flex items-center justify-center font-black text-sm">
                  {ticket.sender_name.substring(0,2).toUpperCase()}
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

          </div>

          {/* Información de ayuda o recordatorio */}
          <div className="bg-green-950/10 border border-green-900/30 p-4 rounded-xl">
            <div className="flex gap-2.5">
              <CircleDot className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <p className="text-[11px] text-gray-400 leading-relaxed">
                Este ticket es una consulta de <span className="text-white font-semibold">Soporte Técnico</span>. Asegúrate de actualizar el estado del ticket para mantener al usuario al tanto de tu investigación.
              </p>
            </div>
          </div>
        </aside>

        {/* COLUMNA DERECHA: HILO DE CONVERSACIÓN Y ACCIONES */}
        {}
        <main className="flex-1 flex flex-col overflow-hidden bg-gray-900">
          
          {/* Mensajes del Hilo */}
          <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-6">
            
            {/* Mensaje Inicial */}
            <div className="space-y-2">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest block">
                Mensaje Inicial
              </span>
              <div className="bg-gray-950/80 border border-gray-800 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between border-b border-gray-900 pb-3 mb-3">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-7 h-7 rounded-lg bg-green-950/60 text-green-400 border border-green-500/20 flex items-center justify-center font-bold text-xs">
                      {ticket.sender_name.substring(0,2).toUpperCase()}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white">{ticket.sender_name}</span>
                      <span className="text-[9px] text-gray-500 block">Usuario Emisor</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-gray-500 font-mono bg-gray-900 px-2.5 py-1 rounded-lg border border-gray-800">
                    {formatDateRelative(ticket.created_at)}
                  </span>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line font-medium pl-1">
                  {ticket.message}
                </p>
              </div>
            </div>

            {/* Separador de Respuestas */}
            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-gray-900 px-4 text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-green-500" /> Respuestas 
                </span>
              </div>
            </div>

            {/* Respuestas del Hilo */}
            <div className="space-y-4">
                  <div 
                    className={`flex flex-col  'items-end' : 'items-start'}`}
                  >
                    <div className={`max-w-[85%] rounded-2xl p-4.5 border shadow-md transition-all duration-150
                      
                         'bg-green-950/20 border-green-500/20 text-gray-200' 
                        'bg-gray-950 border-gray-800 text-gray-300'
                    }`}>
                      
                      {/* Remitente de la Respuesta */}
                      <div className="flex items-center justify-between gap-8 mb-2.5 border-b border-gray-800/40 pb-2">
                        <div className="flex items-center space-x-2">
                          <div className={`w-6 h-6 rounded-md flex items-center justify-center font-black text-xs 
                            
                              ? 'bg-green-800 text-white' 
                              : 'bg-gray-800 text-gray-300'
                          }`}>
                            
                          </div>
                          <div>
                            <span className="text-xs font-bold text-white flex items-center gap-1">
                              
                              
                                <span className="bg-green-950/80 text-green-400 border border-green-500/20 text-[8px] uppercase tracking-wider px-1 rounded font-black">
                                  Admin
                                </span>
                            </span>
                          </div>
                        </div>
                        <span className="text-[9px] text-gray-500 font-mono">
                        </span>
                      </div>

                      <p className="text-sm leading-relaxed whitespace-pre-line font-medium pl-1">
                      </p>
                    </div>
                  </div>
            </div>

          </div>

          {/* ÁREA INFERIOR DE ACCIONES Y FORMULARIO */}
          {}
          <div className="bg-gray-950 border-t border-gray-800 p-6 space-y-4 shrink-0">
            
            {/* Opciones Rápidas Inline (Cambiar Estado, Cambiar Prioridad, Cerrar Ticket) */}
            <div className="flex flex-wrap items-center gap-3">
              
              {/* ACCIÓN: Cambiar Estado */}
              <div className="relative">
                <button 
                  onClick={() => {
                    setMostrandoCambioEstado(!mostrandoCambioEstado);
                    setMostrandoCambioPrioridad(false);
                  }}
                  className="px-4 py-2 bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-gray-700 text-gray-300 font-bold text-xs rounded-xl transition duration-150 flex items-center gap-1.5 active:scale-95 cursor-pointer"
                >
                  <ArrowLeftRight className="w-3.5 h-3.5 text-green-500" />
                  Cambiar estado
                </button>
                
                {mostrandoCambioEstado && (
                  <div className="absolute bottom-full mb-2 left-0 w-44 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl z-30 overflow-hidden divide-y divide-gray-800">
                    <button 
                      onClick={() => cambiarEstado('Abierto')}
                      className="w-full text-left px-4 py-2.5 hover:bg-gray-800 text-xs font-semibold text-gray-300 flex items-center gap-2"
                    >
                      🟢 Abierto
                    </button>
                    <button 
                      onClick={() => cambiarEstado('En proceso')}
                      className="w-full text-left px-4 py-2.5 hover:bg-gray-800 text-xs font-semibold text-gray-300 flex items-center gap-2"
                    >
                      🟡 En proceso
                    </button>
                    <button 
                      onClick={() => cambiarEstado('Cerrado')}
                      className="w-full text-left px-4 py-2.5 hover:bg-gray-800 text-xs font-semibold text-gray-300 flex items-center gap-2"
                    >
                      ⚫ Cerrado
                    </button>
                  </div>
                )}
              </div>

              {/* ACCIÓN: Cambiar Prioridad */}
              <div className="relative">
                <button 
                  onClick={() => {
                    setMostrandoCambioPrioridad(!mostrandoCambioPrioridad);
                    setMostrandoCambioEstado(false);
                  }}
                  className="px-4 py-2 bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-gray-700 text-gray-300 font-bold text-xs rounded-xl transition duration-150 flex items-center gap-1.5 active:scale-95 cursor-pointer"
                >
                  <AlertCircle className="w-3.5 h-3.5 text-green-500" />
                  Cambiar prioridad
                </button>

                {mostrandoCambioPrioridad && (
                  <div className="absolute bottom-full mb-2 left-0 w-44 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl z-30 overflow-hidden divide-y divide-gray-800">
                    <button 
                      onClick={() => cambiarPrioridad('Alta')}
                      className="w-full text-left px-4 py-2.5 hover:bg-gray-800 text-xs font-semibold text-gray-300 flex items-center gap-2"
                    >
                      🔴 Alta
                    </button>
                    <button 
                      onClick={() => cambiarPrioridad('Media')}
                      className="w-full text-left px-4 py-2.5 hover:bg-gray-800 text-xs font-semibold text-gray-300 flex items-center gap-2"
                    >
                      🟡 Media
                    </button>
                    <button 
                      onClick={() => cambiarPrioridad('Baja')}
                      className="w-full text-left px-4 py-2.5 hover:bg-gray-800 text-xs font-semibold text-gray-300 flex items-center gap-2"
                    >
                      🟢 Baja
                    </button>
                  </div>
                )}
              </div>

              {/* ACCIÓN: Cerrar Ticket */}
              {ticket.estado !== 'Cerrado' ? (
                <button 
                  onClick={cerrarTicket}
                  className="px-4 py-2 bg-red-950/40 hover:bg-red-900/40 border border-red-500/20 hover:border-red-500/40 text-red-400 font-bold text-xs rounded-xl transition duration-150 flex items-center gap-1.5 active:scale-95 cursor-pointer ml-auto"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  Cerrar ticket
                </button>
              ) : (
                <span className="text-xs text-gray-500 font-bold italic ml-auto flex items-center gap-1.5 bg-gray-900 px-3 py-1.5 rounded-lg border border-gray-800">
                  🚫 Ticket ya cerrado
                </span>
              )}
            </div>

            {/* FORMULARIO: Escribir Respuesta */}
            <form onSubmit={handleEnviarRespuesta} className="relative">
              <div className="flex flex-col space-y-2">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest block pl-1">
                  Escribir respuesta
                </span>
                
                <div className="relative">
                  <textarea
                    rows="3"
                    value={nuevaRespuesta}
                    onChange={(e) => setNuevaRespuesta(e.target.value)}
                    placeholder="Escribe aquí tu respuesta para resolver la incidencia de Darlin..."
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-800 focus:border-green-600 focus:ring-1 focus:ring-green-600 focus:outline-none rounded-2xl text-sm font-medium text-gray-200 placeholder-gray-600 resize-none pr-14 shadow-inner"
                  ></textarea>

                  <button
                    type="submit"
                    disabled={!nuevaRespuesta.trim()}
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