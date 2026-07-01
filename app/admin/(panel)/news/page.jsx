"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {formatDateAbsolute} from "@/utils/formatDate"
import Select from "@/components/admin/ui/Select"
import Input from "@/components/admin/ui/Input"
import { Header } from '@/components/admin/Header';
import { Container, Th } from "@/components/admin/ui/Table";

import { 
  Search, 
  Edit3, 
  Eye, 
  Calendar, 
  Tag, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2,
  Clock,
  FileEdit,
} from 'lucide-react';

export default function NewsTable() {
    const [news, setNews] = useState([]);
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

    fetch(`/api/admin/news?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        if (data.ok) {
          setNews(data.news);
          setTotal(data.total);
        }
      });

  }, [page, statusFilter, debouncedSearch]);

    const getStatusStyle = (status) => {
        switch (status) {
        case 'published': return 'text-green-700 border-green-800';
        case 'review': return 'text-amber-500 border-amber-500/20';
        case 'draft': return 'text-slate-500 border-slate-600/20';
        default: return 'text-gray-500 border-gray-500/20';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
        case 'published': return <CheckCircle2 size={20} className="mr-1.5" />;
        case 'review': return <Clock size={12} className="mr-1.5" />;
        case 'draft': return <FileEdit size={12} className="mr-1.5" />;
        default: return null;
        }
    };

    const statusOptions = [
      { value: "", label: "Todos los estados" },
      { value: "published", label: "Publicado" },
      { value: "review", label: "En revisión" },
      { value: "draft", label: "Borrador" },
    ];
    
    const getVisiblePages = () => {
    const maxVisible = 5;
    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, start + maxVisible - 1);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

  return (
    <div className="h-full flex-1 flex flex-col overflow-hidden bg-gray-800 text-gray-200 font-sans">
      
      <Header addNews href="/admin/news/create">
        <Header.Title>Noticias</Header.Title>
        <Header.Subtitle>Gestión de Noticas</Header.Subtitle>
      </Header>

      <section className="flex-1 overflow-y-auto p-8 space-y-6">
        
        <div className="bg-gray-900 p-5 rounded-4xl border border-gray-700 flex flex-wrap gap-4 items-center justify-between shadow-xl">
          <div className="relative w-full md:w-96">
            <Input
              className="w-full md:w-96"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Buscar por título, ID o autor..."
              icon={Search}/>
          </div>
          
          <Select className="w-full md:w-56"
            options={statusOptions}
            value={statusFilter}
            onChange={(value) => {
              setStatusFilter(value);
              setPage(1);
          }}/>
        </div>

        <Container>
          <thead>
            <tr className="bg-gray-800/40 text-gray-400 tracking-tight border-b border-slate-800">
              <Th>Detalles del Artículo</Th>
              <Th>Autoría</Th>
              <Th>Categoría</Th>
              <Th>Estado</Th>
              <Th>Analítica</Th>
              <Th>Acciones</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {news.map((item) => (
              <tr key={item.id} className="hover:bg-slate-800/40 transition-all group">
                <td className="px-8 py-5">
                <div className="max-w-xs md:max-w-sm">
                  <p className="text-sm font-bold text-white group-hover:text-green-700 transition truncate mb-1">
                    {item.title}
                  </p>
                  <div className="flex items-center space-x-2 text-xs py-0.5 font-mono text-gray-500">
                    <span>
                      ID: #{item.id}
                    </span>
                    <span className="flex items-center text-gray-500 uppercase font-bold tracking-tighter">
                        <Calendar size={15} className="mr-1"/>{formatDateAbsolute(item.created_at)}
                    </span>
                  </div>
                </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center text-sm text-gray-300">
                    <div className="w-7 h-7 rounded-lg bg-gray-800 flex items-center justify-center mr-3 border border-gray-700 text-xs font-bold">
                      {item.author.split(' ').slice(0,2).map(n => n[0]).join('')}
                    </div>
                    {item.author}
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center text-sm text-slate-300">
                    <Tag size={15} className="mr-2 text-emerald-500" />
                    {item.category}
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className={`inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest border 
                    ${getStatusStyle(item.status)}`}> {getStatusIcon(item.status)} {item.status}
                  </span>
                </td>
                <td className="px-8 py-6 text-sm">
                  <div className="flex flex-col">
                    <span className="flex items-center text-slate-300 font-mono font-bold">
                      <Eye size={20} className="mr-2 text-slate-600" />{item.views}
                    </span>
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex justify-end space-x-2">
                    <Link href={`/admin/news/edit/${item.id}`}
                        className="p-3 bg-gray-800 hover:bg-blue-600 text-slate-400 hover:text-white rounded-xl transition-all shadow-lg active:scale-95 flex items-center justify-center">
                        <Edit3 size={18}/>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr>
              <td colSpan="6" className="border-t border-gray-800">
                  <div className="p-6 bg-gray-800/40 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-ls font-black text-slate-500 uppercase tracking-widest"> Mostrando <span className="text-emerald-600">{showingTo - showingFrom + 1}</span>
                      {" "}de{" "} <span className="text-gray-300">{total}</span> noticias
                  </span>
                  <div className="flex items-center space-x-3">
                    <button disabled={page === 1} onClick={() => setPage(prev => prev - 1)}
                    className="p-2.5 bg-gray-800 border border-gray-700 rounded-xl cursor-pointer text-gray-400 hover:bg-gray-700 transition disabled:opacity-20 disabled:cursor-not-allowed">
                      <ChevronLeft size={18}/>
                    </button> 
                  <div className="flex space-x-1">
                      {getVisiblePages().map((number) => {
                          const isActive = page === number;

                          return (
                          <button key={number} onClick={() => setPage(number)}
                              className={`w-9 h-9 flex items-center justify-center rounded-xl text-xs font-black transition cursor-pointer
                              ${isActive ? "bg-green-800 text-white" :  "bg-gray-800 border border-gray-700 text-gray-400 hover:bg-gray-700"}`} >
                              {number}
                          </button>
                          );
                      })}
                  </div>

                  <button disabled={page === totalPages} onClick={() => setPage(prev => prev + 1)} 
                      className="p-2.5 bg-gray-800 border border-gray-700 rounded-xl text-gray-400 hover:bg-gray-700 transition cursor-pointer">
                      <ChevronRight size={18}/>
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