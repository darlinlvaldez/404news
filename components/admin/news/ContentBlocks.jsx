"use client";

import { ErrorMessage } from "@/components/ErrorMessage";
import { fieldClass } from "@/utils/form";

import { 
  ChevronUp, 
  ChevronDown, 
  Trash2, 
  PlusCircle, 
  Image as ImageIcon, 
  Type, 
  AlignLeft 
} from 'lucide-react';

export const ContentBlocks = ({ blocks, onAddBlock, onRemoveBlock, onUpdateBlock, onMoveBlock, errors = {}, clearField }) => {

  const buttonStyles = `flex items-center space-x-3 bg-gray-800 hover:bg-gray-700 px-6 py-3
  rounded-2xl text-sm font-bold transition border border-gray-700 shadow-lg active:scale-95`
  
  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between border-b border-gray-700 pb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-900/30 p-2 rounded-xl text-blue-500">
            <PlusCircle size={20}/>
          </div>
          <h3 className="text-xl font-bold">Bloques de Contenido</h3>
        </div>
        <span className="text-[10px] bg-gray-900 px-3 py-1 rounded-full text-gray-500 uppercase border border-gray-800 font-bold tracking-widest">
          Estructura de la Noticia
        </span>
      </div>

      <div className="space-y-6">
        {blocks.map((block, index) => (
          <div key={block.id} className="group relative bg-gray-900 border border-gray-700 rounded-3xl p-6 transition-all hover:border-gray-600 shadow-lg">
            
            <div className="absolute -left-14 top-0 bottom-0 flex flex-col items-center justify-center space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => onMoveBlock(index, 'up')} disabled={index === 0}
                className="p-2 bg-gray-700 rounded-xl hover:bg-green-800 disabled:opacity-20 transition shadow-lg">
                <ChevronUp size={16}/>
              </button>
              <div className="bg-gray-800 border border-gray-700 w-8 h-8 flex items-center justify-center rounded-lg text-xs font-mono font-bold text-green-500">
                {block.position}
              </div>
              <button onClick={() => onMoveBlock(index, 'down')}
                disabled={index === blocks.length - 1}
                className="p-2 bg-gray-700 rounded-xl hover:bg-green-800 disabled:opacity-20 transition shadow-lg">
                <ChevronDown size={16}/>
              </button>
            </div>

            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-3">
                {block.block_type === 'paragraph' && <div className="bg-blue-500/10 text-blue-400 p-2 rounded-lg"><AlignLeft size={16}/></div>}
                {block.block_type === 'heading' && <div className="bg-yellow-500/10 text-yellow-400 p-2 rounded-lg"><Type size={16}/></div>}
                {block.block_type === 'image' && <div className="bg-purple-500/10 text-purple-400 p-2 rounded-lg"><ImageIcon size={16}/></div>}
                <span className="text-xs font-black uppercase tracking-widest text-gray-400">{block.block_type}</span>
              </div>
              <button onClick={() => onRemoveBlock(block.id)}
                className="text-gray-600 hover:text-red-500 transition-colors p-2 hover:bg-red-500/10 rounded-xl cursor-pointer"
                title="Eliminar bloque">
                <Trash2 size={18}/>
              </button>
            </div>

            <div className="space-y-4">
              {block.block_type === 'paragraph' && (
              <>
                <textarea 
                  value={block.content}
                  onChange={(e) => {
                    onUpdateBlock(block.id, "content", e.target.value);
                    clearField(`${index}.content`);
                  }}
                  errors={errors} 
                  placeholder="Escribe el párrafo aquí..."
                  className={fieldClass(!!errors[`${index}.content`],
                    "w-full bg-gray-800/40 border border-gray-700 rounded-2xl px-5 py-4 text-sm focus:ring-1 focus:border-transparent focus:ring-green-700 outline-none resize-none min-h-35 leading-relaxed"
                  )}/>

                <ErrorMessage
                  errors={errors}
                  name={`${index}.content`}
                />   
              </>
              )}

              {block.block_type === 'heading' && (
              <>
                <input type="text" value={block.content} 
                  onChange={(e) => 
                    {onUpdateBlock(block.id, 'content', e.target.value);
                    clearField(`${index}.content`);
                  }}
                  errors={errors} 
                  placeholder="Subtítulo de la sección..."
                  className={fieldClass(!!errors[`${index}.content`],
                    "w-full bg-gray-800/40 border border-gray-700 rounded-xl px-5 py-4 text-lg font-bold focus:ring-1 focus:border-transparent focus:ring-green-700 outline-none"
                  )}
                />

                  <ErrorMessage
                    errors={errors}
                    name={`${index}.content`}
                  />  
              </>
              )}

              {block.block_type === 'image' && (
                <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-black text-gray-500 ml-1">URL del recurso</label>
                    <input type="text" value={block.image_url} 
                      onChange={(e) => {
                        onUpdateBlock(block.id, 'image_url', e.target.value);
                        clearField(`${index}.image_url`);
                      }}
                      errors={errors} 
                      placeholder="https://..."
                      className={fieldClass(!!errors[`${index}.image_url`],
                        "w-full bg-gray-800/40 border border-gray-700 rounded-xl px-4 py-3 text-xs focus:ring-1 focus:border-transparent focus:ring-green-700 outline-none font-mono text-blue-400"
                      )}/>
                      <ErrorMessage
                        errors={errors}
                        name={`${index}.image_url`}
                      />    
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-black text-gray-500 ml-1">Descripción Alt (SEO)</label>
                    <input type="text" value={block.alt_text} 
                      onChange={(e) => {
                        onUpdateBlock(block.id, 'alt_text', e.target.value);
                        clearField(`${index}.alt_text`);
                      }}
                      errors={errors} 
                      placeholder="¿Qué se ve en la imagen?"
                      className={fieldClass(!!errors[`${index}.content`],
                        "w-full bg-gray-800/40 border border-gray-700 rounded-xl px-4 py-3 text-xs focus:ring-1 focus:border-transparent focus:ring-green-700 outline-none"
                      )}/>
                  </div>
                </div>
                </>
              )}
            </div>
          </div>
        ))}

        <div className="py-12 flex flex-col items-center border-2 border-dashed border-gray-700 rounded-3xl bg-gray-900/20 hover:bg-gray-900/40 transition-colors">
          <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.2em] mb-6">Añadir componente de contenido</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => onAddBlock('paragraph')}
              className={buttonStyles}>
              <AlignLeft size={18} className="text-blue-400" /> <span>Párrafo</span>
            </button>
            <button onClick={() => onAddBlock('heading')}
              className={buttonStyles}>
              <Type size={18} className="text-yellow-400" /> <span>Encabezado</span>
            </button>
            <button onClick={() => onAddBlock('image')}
              className={buttonStyles}>
              <ImageIcon size={18} className="text-purple-400" /> <span>Imagen</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};