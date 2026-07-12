"use client";

import { Image as ImageIcon, AlignLeft } from 'lucide-react';
import Select from "@/components/admin/ui/Select"
import { ErrorMessage } from "@/components/ErrorMessage";
import { fieldClass } from "@/utils/form";

export const GeneralData = ({ newsData, onInputChange, authors = [], categories = [], errors = {}, clearField }) => {

  const statusOptions = [
    { value: "draft", label: "Borrador" },
    { value: "review", label: "En Revisión" },
    { value: "published", label: "Publicado" },
  ];

  const styleInput = `w-full bg-gray-950 border border-gray-700 rounded-xl font-semibold 
  focus:ring-1 focus:ring-green-800 focus:border-transparent outline-none transition placeholder:text-gray-600`

  const labelStyles = "block text-sm font-black text-gray-500 uppercase mb-1 ml-1"

  return (
    <section className="bg-gray-900 rounded-3xl border border-gray-700 p-8 shadow-2xl relative">

      <div className="flex items-center mb-8">
        <div className="bg-green-900/30 p-2.5 rounded-2xl mr-4 text-green-600">
          <AlignLeft size={22}/>
        </div>
        <h3 className="text-xl font-bold">Datos Generales</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="md:col-span-2">
          <label className={labelStyles}>
            Título Principal
          </label>
          <input type="text" name="title" value={newsData.title} onChange={onInputChange} 
          className={fieldClass(!!errors?.title, `${styleInput} px-5 py-4 text-xl`)}
          placeholder="Escribe un título impactante..."/>   
          <ErrorMessage
            errors={errors}
            name="title"
          />     
        </div>

        <div className="space-y-6">
          <div>
            <label className={labelStyles}>
              URL amigable (Slug)
            </label>
            <input type="text" name="slug" value={newsData.slug} onChange={onInputChange} 
            className={fieldClass(!!errors?.slug, `${styleInput} px-4 py-2.5`)}
            />
            <ErrorMessage
              errors={errors}
              name="slug"
            />   
          </div>
          <div>
            <label className={labelStyles}>
              Imagen de Portada (URL)
            </label>
            <div className="relative group">
              <input type="text" name="cover_image" value={newsData.cover_image} onChange={onInputChange}
                placeholder="https://ejemplo.com/imagen.jpg" className={fieldClass(!!errors?.cover_image, 
                `${styleInput} px-4 py-2.5`)}
              />
              <ImageIcon className="absolute right-3 top-3 text-gray-600 group-focus-within:text-green-800" size={18}/>
              <ErrorMessage
                errors={errors}
                name="cover_image"
              />   
            </div>
          </div>
        </div>

        <div>
          <label className={labelStyles}>
            Resumen / Excerpt
          </label>
          <textarea name="excerpt" value={newsData.excerpt} onChange={onInputChange} rows="5"
            className={fieldClass(!!errors?.excerpt, `${styleInput} px-4 py-2`)}
            placeholder="Escribe un breve resumen para los listados de noticias...">
          </textarea>
          <ErrorMessage
            errors={errors}
            name="excerpt"
          />   
        </div>

        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-gray-800">
          <div>
            <label className={labelStyles}>
              Autor
            </label>
            <Select
              name="author_id"
              placeholder="Seleccionar Autor"
              errors={errors} 
              options={authors.map(author => ({
                value: author.id,
                label: author.name,
              }))}
              value={newsData.author_id}
              onChange={onInputChange}
            />
          </div>
          <div>
            <label className={labelStyles}>
              Categoría
            </label>
            <Select
              name="category_id"
              placeholder="Seleccionar Categoría"
              errors={errors} 
              onOpen={clearField}
              options={categories.map(category => ({
                value: category.id,
                label: category.name,
              }))}
              value={newsData.category_id}
              onChange={onInputChange}
            />
          </div>
          <div>
          <label className={labelStyles}>
              Estado
            </label>
            <Select
              name="status"
              value={newsData.status}
              options={statusOptions}
              onChange={onInputChange}
              errors={errors} 
              placeholder="Seleccionar estado"
            />
          </div>
        </div>
      </div>
    </section>
  );
};