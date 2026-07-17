"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {formatDateAbsolute} from "@/utils/formatDate"
import Select from "@/components/admin/ui/Select"
import Input from "@/components/admin/ui/Input"
import { Header } from '@/components/admin/Header';
import { Container, Th } from "@/components/admin/ui/Table";
import { getStatusStyle, getStatusIcon, getPriorityStyle, getPriorityIcon} from "@/utils/ticketConfig";

import {
  Search,
  Eye,
  ChevronLeft,
  ChevronRight,
  Mail,
} from "lucide-react";

export default function TicketsPage() {
  const [ticket, setTicket] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  
  const searchParams = useSearchParams();

  const initialStatus = searchParams.get("status") ?? "";

  const [statusFilter, setStatusFilter] = useState(initialStatus);
  const [priorityFilter, setPriorityFilter] = useState("");

  const limit = 50;
  const totalPages = Math.ceil(total / limit);
  const showingFrom = (page - 1) * limit + 1;
  const showingTo = Math.min(page * limit, total);

  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const delay = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(delay);
  }, [search]);

  useEffect(() => {

  const offset = (page - 1) * limit;

  const params = new URLSearchParams({ limit, offset });

  if (statusFilter) {params.append("status", statusFilter)}
  if (priorityFilter) {params.append("priority", priorityFilter)}
  if (debouncedSearch) params.append("search", debouncedSearch);

  fetch(`/api/admin/tickets?${params.toString()}`)
    .then(res => res.json())
    .then(data => {

        setTicket(data.rows);
        setTotal(data.total);
    });
  }, [page, statusFilter, priorityFilter, debouncedSearch]);

  const statusOptions = [
    { value: "", label: "Todos los estados" },
    { value: "closed", label: "Cerrado" },
    { value: "in_progress", label: "En progreso" },
    { value: "open", label: "Abierto" },
    { value: "waiting_response", label: "Esperando respuesta" },
  ];

  const priorityOptions = [
    { value: "", label: "Todas las prioridades" },
    { value: "high", label: "Alta" },
    { value: "medium", label: "Media" },
    { value: "low", label: "Baja" },
  ];
  
  const createLabels = (options) =>
  Object.fromEntries(
    options
      .filter(option => option.value)
      .map(option => [option.value, option.label])
  );

  const statusLabels = createLabels(statusOptions);
  const priorityLabels = createLabels(priorityOptions);
  
  const getVisiblePages = () => {
    const maxVisible = 5;
    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, start + maxVisible - 1);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <div className="h-full flex-1 flex flex-col overflow-hidden bg-gray-800 text-gray-200 font-sans">
      <Header>
        <Header.Title>Tickets</Header.Title>
        <Header.Subtitle>Administración y seguimiento de solicitudes</Header.Subtitle>
      </Header>

      <section className="flex-1 overflow-y-auto p-8 space-y-6">
        <div className="bg-gray-900 p-5 rounded-4xl border border-gray-700 flex flex-wrap items-center justify-between shadow-xl">
          <div className="relative w-full md:w-96">
            <Input
              className="w-full md:w-96"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Buscar por ID, asunto, remitente o email..."
              icon={Search}
            />
          </div>

          <div className="flex flex-wrap gap-4 items-center justify-end mt-4 sm:mt-6 md:mt-4 lg:mt-0">
            <Select
              className="w-full md:w-56"
              options={statusOptions}
              value={statusFilter}
              onChange={(value) => {
                setStatusFilter(value);
                setPage(1);
              }}
            />

            <Select
              className="w-full md:w-56"
              options={priorityOptions}
              value={priorityFilter}
              onChange={(value) => {
                setPriorityFilter(value);
                setPage(1);
              }}
            />
          </div>
        </div>

        <Container>
          <thead>
            <tr className="bg-gray-800/40 text-gray-400 tracking-tight border-b border-slate-800">
              <Th>ID</Th>
              <Th>Tipo</Th>
              <Th>Asunto</Th>
              <Th>Remitente</Th>
              <Th>Estado</Th>
              <Th>Prioridad</Th>
              <Th>Ultima Actividad</Th>
              <Th>Acciones</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {ticket.map((item) => (
              <tr key={item.id}
                className="hover:bg-slate-800/40 transition-all group"
              >
                <td className="px-8 py-5">
                  <div className="max-w-xs md:max-w-sm">
                    <div className="flex items-center space-x-2 text-xs py-0.5 font-mono text-gray-500">
                      <span>#{item.id}</span>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <div className="max-w-xs md:max-w-sm">
                    <p className="text-sm font-bold text-white group-hover:text-green-700 transition truncate mb-1">
                      {item.type}
                    </p>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <div className="max-w-xs md:max-w-50">
                    <p className="text-sm font-bold text-white transition truncate mb-1" title={item.subject}>
                      {item.subject}
                    </p>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <div className="flex items-center text-base text-gray-300">
                    <div className="w-7 h-7 rounded-lg bg-gray-800 flex items-center justify-center mr-3 border border-gray-700 text-xs font-bold">
                      {item.name
                        .split(" ")
                        .slice(0, 2)
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    {item.name}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 font-mono mt-1"> 
                    <Mail size={18}/> <span>{item.email}</span>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <span
                    className={`inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest border 
                    ${getStatusStyle(item.status)}`}
                  >
                    {" "}
                    {getStatusIcon(item.status)}{" "}
                    {statusLabels[item.status] ?? item.status}
                  </span>
                </td>

                <td className="px-8 py-5">
                  <span
                    className={`inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest border
                      ${getPriorityStyle(item.priority)}`}
                  >
                    {getPriorityIcon(item.priority)}
                    {priorityLabels[item.priority] ?? item.priority}
                  </span>
                </td>
                <td className="px-8 py-5 text-sm font-bold text-gray-200">
                    {formatDateAbsolute(item.created_at)}
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="flex space-x-2">
                    <Link
                      href={`/admin/ticket/ticket-details/${item.id}`}
                      className="p-3 bg-gray-800 hover:bg-green-600 text-slate-400 hover:text-white rounded-xl transition-all shadow-lg active:scale-95 flex items-center justify-center"
                    ><Eye size={18} />Ver
                    </Link>
                  </div>
                </td>
              </tr>
            ))}

            {ticket.length === 0 && (
              <tr>
                <td
                  colSpan="8"
                  className="px-8 py-20 text-center text-gray-600 italic"
                >
                  No se han encontrado registros de usuarios.
                </td>
              </tr>
            )}
          </tbody>

          <tfoot>
            <tr>
              <td colSpan="8" className="border-t border-gray-800">
                <div className="p-6 bg-gray-800/40 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-ls font-black text-slate-500 uppercase tracking-widest">
                    {" "}
                    Mostrando{" "}
                    <span className="text-emerald-600">
                      {showingTo - showingFrom + 1}
                    </span>{" "}
                    de <span className="text-gray-300">{total}</span> noticias
                  </span>
                  <div className="flex items-center space-x-3">
                    <button
                      disabled={page === 1}
                      onClick={() => setPage((prev) => prev - 1)}
                      className="p-2.5 bg-gray-800 border border-gray-700 rounded-xl cursor-pointer text-gray-400 hover:bg-gray-700 transition disabled:opacity-20 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <div className="flex space-x-1">
                      {getVisiblePages().map((number) => {
                        const isActive = page === number;

                        return (
                          <button
                            key={number}
                            onClick={() => setPage(number)}
                            className={`w-9 h-9 flex items-center justify-center rounded-xl text-xs font-black transition cursor-pointer
                            ${isActive ? "bg-green-800 text-white" : "bg-gray-800 border border-gray-700 text-gray-400 hover:bg-gray-700"}`}
                          >
                            {number}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      disabled={page === totalPages}
                      onClick={() => setPage((prev) => prev + 1)}
                      className="p-2.5 bg-gray-800 border border-gray-700 rounded-xl text-gray-400 hover:bg-gray-700 transition cursor-pointer"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tfoot>
        </Container>
      </section>
    </div>
  );
}