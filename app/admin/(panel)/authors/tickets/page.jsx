"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {formatDateRelative} from "@/utils/formatDate"
import Select from "@/components/admin/ui/Select"
import Input from "@/components/admin/ui/Input"
import FormModal from "@/components/admin/ui/FormModal"
import AttachmentDropdown from "@/components/admin/ui/AttachmentDropdown";
import useFileUpload from "@/hooks/useFileUpload";
import { ActionButton } from "@/components/admin/ui/ActionButtons"
import { useFormErrors } from '@/hooks/useFormErrors';
import { fieldClass } from '@/utils/form';
import { ErrorMessage } from '@/components/ErrorMessage';
import { Header } from '@/components/admin/Header';

import { 
  getStatusStyle, 
  getStatusIcon, 
  statusOptions
} from "@/utils/ticketConfig";

import {
  Search,
  ChevronLeft,
  ChevronRight,
  Plus,
  Paperclip
} from "lucide-react";

export default function TicketsPage() {
  const [ticket, setTicket] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const {errors, clearField, clearErrors, handleResponse} = useFormErrors();

  const { files, handleFileChange, removeFile,  clearFiles } = useFileUpload();
  
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

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("/api/tickets/categories");
      const data = await res.json();

      setCategories(data);
    };

    fetchCategories();
  }, []);

  const categoryOptions = categories.map(c => ({
    value: c.id,
    label: c.name,
  }));

  const handleCreateTicket = async (e) => {
    e.preventDefault();

    clearErrors();

    try {
      const formData = new FormData();
      formData.append("subject", subject);
      formData.append("message", message);
      formData.append("categoryId", categoryId);

      files.forEach((file) => {
        formData.append("files", file);
      });

      const response = await fetch(`/api/admin/authors/tickets`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        handleResponse(data);
        return;
      }

      setSubject("");
      setMessage("");
      clearFiles();
      setShowModal(false);

      window.location.reload();
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
  
  const getVisiblePages = () => {
    const maxVisible = 5;
    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, start + maxVisible - 1);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <div className="h-full flex-1 flex flex-col overflow-hidden bg-gray-800 text-gray-200 font-sans">
      <Header
        actions={
          <ActionButton icon={Plus} onClick={() => setShowModal(true)}>
            Nuevo Ticket
          </ActionButton>
        }
      >
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

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          {ticket.map((tickets) => (
            <Link key={tickets.id}
              href={`/admin/authors/ticket/${tickets.id}`}
              className="bg-gray-900 border border-gray-700 rounded-3xl p-6 shadow-xl hover:border-gray-600 transition"
            >
              <div className="flex items-start justify-between gap-4">
                 <div className="min-w-0 flex-1">
                  <span className="text-base font-mono text-gray-500">
                    #{tickets.ticket_number}
                  </span>

                    <h3 className="text-lg font-bold text-white mt-1 truncate"
                      title={tickets.subject}
                    >
                      {tickets.subject}
                    </h3>

                    <div className="flex items-start gap-3 mt-2">
                      <p className="text-sm text-gray-400 line-clamp-2"
                        title={tickets.last_message || tickets.message}
                      >
                        {tickets.last_message || tickets.message}
                      </p>

                      {tickets.unread_user_count > 0 && (
                        <span className="shrink-0 bg-green-600 text-white px-3 py-1 rounded-xl text-xs font-bold">
                          {tickets.unread_user_count} nuevo
                          {tickets.unread_user_count > 1 && "s"}
                        </span>
                      )}
                  </div>
                </div>

                {Number(tickets.is_new) === 1 && (
                  <span className="bg-red-700 mt-2.5 text-white px-3 py-1.5 rounded-xl text-xs font-bold">Nuevo</span>
                )}
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

              <div className="mt-4 text-sm text-gray-500">
                Categoría:
                <span className="ml-2 text-gray-300 font-medium">
                  {tickets.category}
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
            </Link>
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

      <FormModal
        open={showModal}
        title="Nuevo Ticket de Soporte"
        subtitle="Completa los campos para crear tu ticket"
        onClose={() => setShowModal(false)}
        onSubmit={handleCreateTicket}
        submitText="Enviar Ticket"
      >
      <div className="space-y-5">
        <div className="flex gap-4">

          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-300 mb-1.5">
              Categoría <span className="text-rose-400">*</span>
            </label>
            <Select
              name="categoryId"
              options={categoryOptions}
              value={categoryId}
              onChange={(e) => {
                setCategoryId(e.target.value);
                clearField("categoryId");
              }}
              errors={errors}
              placeholder="Selecciona una categoría..."
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1.5">
            Asunto <span className="text-rose-400">*</span>
          </label>
          <Input
            type="text"
            name="subject"
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
              clearField("subject");
            }}
            errors={errors}
            placeholder="Escribe el asunto del ticket..."
          />
        </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-medium text-gray-300">
                Mensaje <span className="text-rose-400">*</span>
              </label>
              <span className="text-[11px] text-gray-500">
                {message.length}/500
              </span>
            </div>
            <textarea
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                clearField("message");
              }}
              placeholder="Describe el problema o la solicitud detalladamente..."
              rows={5}
              maxLength={500}
              className={fieldClass(!!errors?.message,
                "w-full bg-gray-950/70 rounded-xl border border-gray-700 focus:border-green-800 outline-none transition p-4 text-sm text-gray-100 placeholder:text-gray-500 resize-none shadow-inner"
              )}
            />
            <ErrorMessage
              errors={errors}
              name="message"
            />
          </div>

          <input 
            type="file" 
            multiple
            accept="image/*,.pdf,.txt"
            className="hidden"
            id="ticket-files"
            onChange={handleFileChange}
          />

          <label htmlFor="ticket-files"
            className="border border-dashed border-gray-800 hover:border-gray-700 rounded-xl p-3 text-center bg-gray-950/30 transition-colors cursor-pointer block"
          >
            <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
              <Paperclip size={14} />
              <span>
                  Adjuntar capturas o documentos
              </span>
            </div>
          </label>
          <div className="flex justify-end">
            <AttachmentDropdown
              files={files}
              onRemove={removeFile}
            />
          </div>
        </div>
      </FormModal>
    </div>
  );
}