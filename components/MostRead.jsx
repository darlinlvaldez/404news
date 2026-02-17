"use client";

import { useState } from "react";
import Link from "next/link";
import { formatDateRelative } from "@/utils/formatDate";

export default function MostRead({ mostRead }) {
  const [showAll, setShowAll] = useState(false);

  const visibleNews = showAll ? mostRead : mostRead.slice(0, 4);

  const mostReadButton = `group flex items-center gap-2 px-10 py-3 border-2 border-gray-900 text-gray-900 text-sm
    font-bold rounded-full hover:bg-gray-900 hover:text-white transition-all active:scale-95 tracking-wide cursor-pointer`

  return (
    <>
      <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
            <div className="flex items-center gap-2">
                <span className="w-3 h-8 bg-orange-600 rounded-full"></span>
                <h3 className="text-3xl font-bold tracking-tight text-gray-900">Más Leídas</h3>
            </div>
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {visibleNews.map((news, index) => (
            <article key={news.id} className="mb-10 relative">
                <Link href={`/news/news-details/${news.slug}`}>
                    <div className="relative">
                        <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/60 text-white px-2 py-1 rounded backdrop-blur-sm z-10">
                            <span className="text-xs font-bold">{index + 1}</span>
                        </div>
                        <img className="w-full h-48 object-cover rounded" src={news.cover_image} alt={news.title}/>
                    </div>

                    <h3 className="w-full text-base mt-2 text-gray-800 hover:underline line-clamp-2 font-medium">
                        {news.title}
                    </h3>

                    <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1 text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="text-sm font-bold">{news.views?.toLocaleString()}</span>
                        </div>
                        <time className="text-gray-400 text-sm font-bold">{formatDateRelative(news.created_at)}</time>
                    </div>
                </Link>
            </article>
            ))}
        </section>
        
      <div className="mt-12 flex justify-center">
        <button onClick={() => setShowAll(!showAll)} className={mostReadButton}>
          {showAll ? "VER MENOS" : "VER MÁS"}
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform ${showAll && "rotate-180"}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
      </div>
    </>
  );
}