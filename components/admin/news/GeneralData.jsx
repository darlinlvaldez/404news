"use client";

import { Image as ImageIcon, AlignLeft } from 'lucide-react';

export const GeneralData = ({ newsData, onInputChange, authors = [], categories = [] }) => {
  return (
    <section className="bg-gray-900 rounded-3xl border border-gray-700 p-8 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-green-700 rounded-t-3xl"></div>

      <div className="flex items-center mb-8">
        <div className="bg-green-900/30 p-2.5 rounded-2xl mr-4 text-green-600">
          <AlignLeft size={22} />
        </div>
        <h3 className="text-xl font-bold">Datos Generales</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
            Título Principal
          </label>
          <input type="text" name="title" value={newsData.title} onChange={onInputChange}
            placeholder="Escribe un título impactante..."
            className="w-full bg-gray-800 border border-gray-700 rounded-2xl px-5 py-4 text-xl font-semibold focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition placeholder:text-gray-600"/>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
              URL amigable (Slug)
            </label>
            <input type="text" name="slug" value={newsData.slug} readOnly
              className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-500 cursor-not-allowed font-mono"/>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
              Imagen de Portada (URL)
            </label>
            <div className="relative">
              <input type="text" name="cover_image" value={newsData.cover_image} onChange={onInputChange}
                placeholder="https://ejemplo.com/imagen.jpg"
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-green-600 outline-none pr-10"/>
              <ImageIcon className="absolute right-3 top-3 text-gray-600" size={18}/>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
            Resumen / Excerpt
          </label>
          <textarea name="excerpt"  value={newsData.excerpt} onChange={onInputChange} rows="5"
            className="w-full bg-gray-800 border border-gray-700 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-green-600 outline-none resize-none transition"
            placeholder="Escribe un breve resumen para los listados de noticias...">
            </textarea>
        </div>

        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-gray-800">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
              Autor
            </label>
            <select name="author_id" value={newsData.author_id} onChange={onInputChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-green-600 transition">
              <option value="">Seleccionar Autor</option>
              {authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
              Categoría
            </label>
            <select name="category_id" value={newsData.category_id} onChange={onInputChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-green-600 transition">
              <option value="">Seleccionar Categoría</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
              Estado
            </label>
            <select name="status" value={newsData.status} onChange={onInputChange}
              className={`w-full border border-gray-700 rounded-xl px-4 py-3 text-sm font-bold transition ${newsData.status === "published" ? "bg-green-900/20 text-green-500 border-green-800" : "bg-gray-800 text-gray-100"}`}>
              <option value="draft">Borrador</option>
              <option value="review">En Revisión</option>
              <option value="published">Publicado</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
};