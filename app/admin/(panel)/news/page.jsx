"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {formatDateAbsolute} from "@/utils/formatDate"

import { 
  Plus, 
  Search, 
  Edit3, 
  Eye, 
  Calendar, 
  Tag, 
  ChevronLeft, 
  ChevronRight, 
  Newspaper,
  CheckCircle2,
  Clock,
  FileEdit
} from 'lucide-react';

export default function NewsTable() {
    const [news, setNews] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    
    const [statusFilter, setStatusFilter] = useState("");
    const [isOpen, setIsOpen] = useState(false);

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
        case 'published': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
        case 'review': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
        case 'draft': return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
        default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
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
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-800 text-gray-200 font-sans">
      
      <header className="h-20 bg-gray-900 flex items-center justify-between px-8 border-b border-gray-700 shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="p-2.5 bg-emerald-600/10 rounded-xl text-emerald-500">
            <Newspaper size={24}/>
          </div>
          <div>
            <h2 className="text-xl font-black text-white tracking-tight">Gestión de Noticias</h2>
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Publicaciones del portal</p>
          </div>
        </div>
        
        <Link href="/admin/news/create" 
        className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-2xl 
        font-black text-xs uppercase tracking-widest transition flex items-center shadow-lg shadow-emerald-900/20">
          <Plus size={18} className="mr-2" />Nueva Noticia</Link>
      </header>

      <section className="flex-1 overflow-y-auto p-8 space-y-6">
        
        <div className="bg-gray-900 p-5 rounded-4xl border border-gray-700 flex flex-wrap gap-4 items-center justify-between shadow-xl">
          <div className="relative w-full md:w-112.5">
            <Search className="absolute inset-y-0 left-4 flex items-center text-slate-600 my-auto" size={18} />
            <input type="text" 
            value={search} onChange={(e) => {
              setSearch(e.target.value);
              setPage(1); 
            }} 
            placeholder="Buscar por título, ID o autor..." 
            className="w-full bg-[#0b0f1a] border border-slate-800 rounded-2xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/50 transition text-gray-100 placeholder:text-slate-700"/>
        </div>
          
        <div className="relative w-full md:w-56">
          <button tabIndex={0}
          onClick={() => setIsOpen(prev => !prev)}
            onBlur={() => setIsOpen(false)}
            className={`bg-gray-900 border border-gray-700 px-5 py-3.5 text- font-bold 
            focus:outline-none focus:border-emerald-600 cursor-pointer w-full text-left
            ${isOpen ? "rounded-t-2xl" : "rounded-2xl"}`}>
            <span className="text-slate-400">
              {statusOptions.find(opt => opt.value === statusFilter)?.label}
            </span>
          </button>

            {isOpen && (
              <ul className="absolute w-full bg-[#0b0f1a] border border-emerald-600 border-t-0 rounded-b-2xl overflow-hidden z-10">
                {statusOptions.map((option) => (
                  <li key={option.value}
                    onClick={() => {
                      setStatusFilter(option.value);
                      setIsOpen(false);
                      setPage(1);
                    }}
                    className="px-5 py-3 text-xs hover:bg-slate-800 cursor-pointer text-slate-400">
                    {option.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="bg-gray-900 rounded-4xl border border-gray-700 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-900 text-slate-500 text-xs uppercase font-black tracking-tight border-b border-slate-800">
                  <th className="px-8 py-6">Detalles del Artículo</th>
                  <th className="px-8 py-6">Autoría</th>
                  <th className="px-8 py-6">Categoría</th>
                  <th className="px-8 py-6">Estado</th>
                  <th className="px-8 py-6">Analítica</th>
                  <th className="px-8 py-6 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {news.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/20 transition-all group">
                    <td className="px-8 py-6">
                    <div className="max-w-xs md:max-w-sm">
                        <p className="text-sm font-bold text-white group-hover:text-emerald-400 transition truncate mb-1">
                            {item.title}
                        </p>
                        <div className="flex items-center space-x-2 text-xs font-mono text-slate-600">
                            <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                                ID: #{item.id}
                            </span>
                            <span className="flex items-center text-slate-500 uppercase font-bold tracking-tighter">
                                <Calendar size={15} className="mr-1"/>{formatDateAbsolute(item.created_at)}
                            </span>
                        </div>
                    </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center text-sm text-slate-300">
                        <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center mr-3 border border-slate-700 text-[10px] font-bold">
                          {item.author.split(' ').map(n => n[0]).join('')}
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
                            className="p-3 bg-gray-900 hover:bg-blue-600 text-slate-400 hover:text-white rounded-xl transition-all shadow-lg active:scale-95 flex items-center justify-center">
                            <Edit3 size={16}/>
                        </Link>
                    </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-6 bg-gray-900 border-t border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest"> Mostrando <span className="text-emerald-500">{showingTo - showingFrom + 1}</span>
                {" "}de{" "} <span className="text-white">{total}</span> noticias
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
        </div>
      </section>
    </div>
  );
}