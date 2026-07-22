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
              placeholder="Buscar por ID, asunto..."
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

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          {ticket.map((tickets) => (
            <div key={tickets.id}
              className="bg-gray-900 border border-gray-700 rounded-3xl p-6 shadow-xl hover:border-gray-600 transition"
            >
              <div className="flex items-start justify-between gap-4">
                 <div className="min-w-0 flex-1">
                  <span className="text-xs font-mono text-gray-500">
                    #{tickets.id}
                  </span>

                  <h3 className="text-lg font-bold text-white mt-1 truncate"
                    title={tickets.subject}
                  >
                    {tickets.subject}
                  </h3>

                </div>

                <Link href={`/admin/ticket/${tickets.id}`}
                  className="p-3 bg-gray-800 hover:bg-green-600 text-slate-400 hover:text-white rounded-xl transition-all shadow-lg active:scale-95 flex items-center gap-2"
                >
                  <Eye size={18} />
                  Ver
                </Link>
              </div>

              <div className="flex flex-wrap gap-3 mt-6">
                <span className={`inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest border 
                ${getStatusStyle(
                    tickets.status
                  )}`}
                >
                  {getStatusIcon(tickets.status)}
                  {statusLabels[tickets.status] ?? tickets.status}
                </span>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-800 flex justify-between items-center">
                <span className="text-sm text-gray-400">
                  Última actividad
                </span>

                <span className="text-sm font-bold text-gray-200">
                  {formatDateRelative(tickets.last_reply_at)}
                </span>
              </div>
            </div>
          ))}

          {ticket.length === 0 && (
            <div className="col-span-full bg-gray-900 border border-gray-700 rounded-3xl py-20 text-center text-gray-600 italic">
              No se han encontrado registros de usuarios.
            </div>
          )}
        </div>

          <div className="mt-6 bg-gray-800/40 border border-gray-800 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-ls font-black text-slate-500 uppercase tracking-widest">
              {" "}
              Mostrando{" "}
              <span className="text-emerald-600">
                 {showingFrom}-{showingTo}
              </span>{" "}
              de <span className="text-gray-300">{total}</span> tickets
            </span>
            <div className="flex items-center space-x-3">
              <button disabled={page === 1}
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

              <button disabled={page === totalPages}
                onClick={() => setPage((prev) => prev + 1)}
                className="p-2.5 bg-gray-800 border border-gray-700 rounded-xl text-gray-400 hover:bg-gray-700 transition cursor-pointer"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
      </section>
    </div>
  );
}