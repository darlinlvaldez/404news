"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {formatDateRelative} from "@/utils/formatDate"
import Select from "@/components/admin/ui/Select"
import Input from "@/components/admin/ui/Input"
import { Header } from '@/components/admin/Header';
import { Container, Th } from "@/components/admin/ui/Table";
import { 
  getStatusStyle, 
  getStatusIcon, 
  statusOptions
} from "@/utils/ticketConfig";

import {
  Search,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function TicketsPage() {
  const [ticket, setTicket] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  
  const searchParams = useSearchParams();

  const initialStatus = searchParams.get("status") ?? "";

  const [statusFilter, setStatusFilter] = useState(initialStatus);

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
  if (debouncedSearch) params.append("search", debouncedSearch);

  const fetchTicket = async () => {
    try {
      const res = await fetch(`/api/admin/authors/tickets?${params.toString()}`);
      const data = await res.json();
      
      setTicket(data.rows);
      setTotal(data.total);
        
    } catch (error) {
      console.error("Error loading tickets:", error);
    }
  }
  fetchTicket();
  }, [page, statusFilter, debouncedSearch]);
  
  const createLabels = (options) =>
  Object.fromEntries(
    options
      .filter(option => option.value)
      .map(option => [option.value, option.label])
  );

  const statusLabels = createLabels(statusOptions);
  
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

          </div>
        </div>

        <Container>
          <thead>
            <tr className="bg-gray-800/40 text-gray-400 tracking-tight border-b border-slate-800">
              <Th>ID</Th>
              <Th>Asunto</Th>
              <Th>Estado</Th>
              <Th>Ultima Actividad</Th>
              <Th>Acciones</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {ticket.map((tickets) => (
              <tr key={tickets.id} className="hover:bg-slate-800/40 transition-all group">

                <td className="px-8 py-5">
                  <div className="max-w-xs md:max-w-50">
                    <p className="text-sm font-bold text-white transition truncate mb-1" title={tickets.subject}>
                      {tickets.subject}
                    </p>
                  </div>
                </td>

                <td className="px-8 py-5">
                  <span
                    className={`inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest border 
                    ${getStatusStyle(tickets.status)}`}
                  >
                    {" "}
                    {getStatusIcon(tickets.status)}{" "}
                    {statusLabels[tickets.status] ?? tickets.status}
                  </span>
                </td>

                <td className="px-8 py-5 text-sm font-bold text-gray-200">
                    {formatDateRelative(tickets.last_reply_at)}
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="flex space-x-2">
                    <Link href={`/admin/authors/ticket/${tickets.id}`}
                      className="p-3 bg-gray-800 hover:bg-green-600 text-slate-400 hover:text-white rounded-xl transition-all shadow-lg active:scale-95 flex items-center justify-center"
                    ><Eye size={18} />Ver
                    </Link>
                  </div>
                </td>
              </tr>
            ))}

            {ticket.length === 0 && (
              <tr>
                <td colSpan="5"
                  className="px-8 py-20 text-center text-gray-600 italic"
                >
                  No se han encontrado registros de usuarios.
                </td>
              </tr>
            )}
          </tbody>

          <tfoot>
            <tr>
              <td colSpan="5" className="border-t border-gray-800">
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