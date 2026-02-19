"use client";

import React, { useState, useEffect } from 'react';
import { 
  ChevronUp, 
  ChevronDown, 
  Trash2, 
  PlusCircle, 
  Image as ImageIcon, 
  Type, 
  AlignLeft, 
  Save, 
  ArrowLeft,
  Eye,
  AlertTriangle,
} from 'lucide-react';

const App = () => {
  const [newsData, setNewsData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    cover_image: '',
    author_id: '',
    category_id: '',
    status: 'draft',
    active: true,
    views: 0
  });

  const [blocks, setBlocks] = useState([
    { id: 1, block_type: 'heading', content: '', position: 1 },
    { id: 2, block_type: 'paragraph', content: '', position: 2 }
  ]);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewsData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  useEffect(() => {
    if (newsData.title) {
      const generatedSlug = newsData.title
        .toLowerCase()
        .trim()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
      setNewsData(prev => ({ ...prev, slug: generatedSlug }));
    }
  }, [newsData.title]);


  const addBlock = (type) => {
    const newBlock = {
      id: Date.now(),
      block_type: type,
      content: '',
      image_url: '',
      alt_text: '',
      position: blocks.length + 1
    };
    setBlocks([...blocks, newBlock]);
  };

  const removeBlock = (id) => {
    const filtered = blocks.filter(b => b.id !== id);
    const reordered = filtered.map((b, index) => ({ ...b, position: index + 1 }));
    setBlocks(reordered);
  };

  const updateBlock = (id, field, value) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, [field]: value } : b));
  };

  const moveBlock = (index, direction) => {
    const newBlocks = [...blocks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newBlocks.length) return;

    [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]];
    
    const updatedPositions = newBlocks.map((b, idx) => ({ ...b, position: idx + 1 }));
    setBlocks(updatedPositions);
  };

  const handleSave = () => {
    const payload = { 
      news: newsData, 
      blocks: blocks 
    };
    console.log('Payload estructurado para API:', payload);
    alert('¡Cambios guardados con éxito!');
  };

  return (
      <div className="flex-1 overflow-y-auto">
        
        <header className="sticky top-0 z-20 bg-gray-900/90 backdrop-blur-md px-8 py-4 border-b border-gray-700 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button className="text-gray-400 hover:text-white transition p-2 hover:bg-gray-800 rounded-full">
               <ArrowLeft size={20} />
            </button>
            <div>
              <h2 className="text-lg font-bold leading-none">{newsData.title || 'Nueva Noticia'}</h2>
              <span className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">Editor de Contenido</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-700 mr-2">
              <Eye size={14} className="text-gray-400 mr-2" />
              <span className="text-xs font-mono text-gray-300">{newsData.views} vistas</span>
            </div>
            <button 
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-500 text-white px-6 py-2.5 rounded-xl font-bold flex items-center transition shadow-lg shadow-green-900/20"
            >
              <Save size={18} className="mr-2" /> Guardar Noticia
            </button>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-6 py-10 space-y-12">
          
          <section className="bg-gray-900 rounded-3xl border border-gray-700 p-8 shadow-2xl relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-600 to-green-400 rounded-t-3xl"></div>
            
            <div className="flex items-center mb-8">
              <div className="bg-green-900/30 p-2.5 rounded-2xl mr-4 text-green-500">
                <AlignLeft size={22} />
              </div>
              <h3 className="text-xl font-bold">Datos Generales</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Título Principal</label>
                <input 
                  type="text" name="title" value={newsData.title} onChange={handleInputChange}
                  placeholder="Escribe un título impactante..."
                  className="w-full bg-gray-800 border border-gray-700 rounded-2xl px-5 py-4 text-xl font-semibold focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition placeholder:text-gray-600"
                />
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">URL amigable (Slug)</label>
                  <input 
                    type="text" name="slug" value={newsData.slug} readOnly
                    className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-500 cursor-not-allowed font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Imagen de Portada (URL)</label>
                  <div className="relative">
                    <input 
                      type="text" name="cover_image" value={newsData.cover_image} onChange={handleInputChange}
                      placeholder="https://ejemplo.com/imagen.jpg"
                      className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-green-600 outline-none pr-10"
                    />
                    <ImageIcon className="absolute right-3 top-3 text-gray-600" size={18} />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Resumen / Excerpt</label>
                <textarea 
                  name="excerpt" value={newsData.excerpt} onChange={handleInputChange} rows="5"
                  className="w-full bg-gray-800 border border-gray-700 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-green-600 outline-none resize-none transition"
                  placeholder="Escribe un breve resumen para los listados de noticias..."
                ></textarea>
              </div>

              <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-gray-800">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Autor</label>
                  <select name="author_id" value={newsData.author_id} onChange={handleInputChange} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-green-600 transition">
                    <option value="">Seleccionar Autor</option>
                    <option value="1">Juan Pérez</option>
                    <option value="2">Ana García</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Categoría</label>
                  <select name="category_id" value={newsData.category_id} onChange={handleInputChange} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-green-600 transition">
                    <option value="">Seleccionar Categoría</option>
                    <option value="1">Tecnología</option>
                    <option value="2">Mundo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Estado</label>
                  <select 
                    name="status" 
                    value={newsData.status} 
                    onChange={handleInputChange} 
                    className={`w-full border border-gray-700 rounded-xl px-4 py-3 text-sm font-bold transition ${newsData.status === 'published' ? 'bg-green-900/20 text-green-500 border-green-800' : 'bg-gray-800 text-gray-100'}`}
                  >
                    <option value="draft">Borrador</option>
                    <option value="review">En Revisión</option>
                    <option value="published">Publicado</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-4 bg-gray-800/50 p-4 rounded-2xl border border-gray-700/50 w-fit">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" name="active" checked={newsData.active} onChange={handleInputChange} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Noticia Visible en Web</span>
              </div>
            </div>
          </section>

          <section className="space-y-8">
            <div className="flex items-center justify-between border-b border-gray-700 pb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-900/30 p-2 rounded-xl text-blue-400">
                  <PlusCircle size={20} />
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
                    <button 
                      onClick={() => moveBlock(index, 'up')}
                      disabled={index === 0}
                      className="p-2 bg-gray-700 rounded-xl hover:bg-green-600 disabled:opacity-20 transition shadow-lg"
                    >
                      <ChevronUp size={16} />
                    </button>
                    <div className="bg-gray-800 border border-gray-700 w-8 h-8 flex items-center justify-center rounded-lg text-xs font-mono font-bold text-green-500">
                      {block.position}
                    </div>
                    <button 
                      onClick={() => moveBlock(index, 'down')}
                      disabled={index === blocks.length - 1}
                      className="p-2 bg-gray-700 rounded-xl hover:bg-green-600 disabled:opacity-20 transition shadow-lg"
                    >
                      <ChevronDown size={16} />
                    </button>
                  </div>

                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-3">
                      {block.block_type === 'paragraph' && <div className="bg-blue-500/10 text-blue-400 p-2 rounded-lg"><AlignLeft size={16}/></div>}
                      {block.block_type === 'heading' && <div className="bg-yellow-500/10 text-yellow-400 p-2 rounded-lg"><Type size={16}/></div>}
                      {block.block_type === 'image' && <div className="bg-purple-500/10 text-purple-400 p-2 rounded-lg"><ImageIcon size={16}/></div>}
                      <span className="text-xs font-black uppercase tracking-widest text-gray-400">{block.block_type}</span>
                    </div>
                    <button 
                      onClick={() => removeBlock(block.id)}
                      className="text-gray-600 hover:text-red-500 transition-colors p-2 hover:bg-red-500/10 rounded-xl"
                      title="Eliminar bloque"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {block.block_type === 'paragraph' && (
                      <textarea 
                        value={block.content} onChange={(e) => updateBlock(block.id, 'content', e.target.value)}
                        placeholder="Escribe el párrafo aquí..."
                        className="w-full bg-gray-800/40 border border-gray-700 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-green-600 outline-none resize-none min-h-[140px] leading-relaxed"
                      ></textarea>
                    )}

                    {block.block_type === 'heading' && (
                      <input 
                        type="text" value={block.content} onChange={(e) => updateBlock(block.id, 'content', e.target.value)}
                        placeholder="Subtítulo de la sección..."
                        className="w-full bg-gray-800/40 border border-gray-700 rounded-xl px-5 py-4 text-lg font-bold focus:ring-2 focus:ring-green-600 outline-none"
                      />
                    )}

                    {block.block_type === 'image' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase font-black text-gray-500 ml-1">URL del recurso</label>
                          <input 
                            type="text" value={block.image_url} onChange={(e) => updateBlock(block.id, 'image_url', e.target.value)}
                            placeholder="https://..."
                            className="w-full bg-gray-800/40 border border-gray-700 rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-green-600 outline-none font-mono text-blue-400"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase font-black text-gray-500 ml-1">Descripción Alt (SEO)</label>
                          <input 
                            type="text" value={block.alt_text} onChange={(e) => updateBlock(block.id, 'alt_text', e.target.value)}
                            placeholder="¿Qué se ve en la imagen?"
                            className="w-full bg-gray-800/40 border border-gray-700 rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-green-600 outline-none"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              <div className="py-12 flex flex-col items-center border-2 border-dashed border-gray-700 rounded-3xl bg-gray-900/20 hover:bg-gray-900/40 transition-colors">
                <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.2em] mb-6">Añadir componente de contenido</p>
                <div className="flex flex-wrap justify-center gap-4">
                  <button 
                    onClick={() => addBlock('paragraph')}
                    className="flex items-center space-x-3 bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-2xl text-sm font-bold transition border border-gray-700 shadow-lg active:scale-95"
                  >
                    <AlignLeft size={18} className="text-blue-400" /> <span>Párrafo</span>
                  </button>
                  <button 
                    onClick={() => addBlock('heading')}
                    className="flex items-center space-x-3 bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-2xl text-sm font-bold transition border border-gray-700 shadow-lg active:scale-95"
                  >
                    <Type size={18} className="text-yellow-400" /> <span>Encabezado</span>
                  </button>
                  <button 
                    onClick={() => addBlock('image')}
                    className="flex items-center space-x-3 bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-2xl text-sm font-bold transition border border-gray-700 shadow-lg active:scale-95"
                  >
                    <ImageIcon size={18} className="text-purple-400" /> <span>Imagen</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="pt-12 border-t border-gray-700">
            {!showDeleteConfirm ? (
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button 
                  onClick={handleSave}
                  className="w-full sm:flex-1 bg-green-600 hover:bg-green-500 text-white font-black py-5 rounded-3xl shadow-2xl shadow-green-900/40 transition transform hover:-translate-y-1 active:scale-95 text-lg tracking-tight uppercase"
                >
                  Confirmar y Guardar Noticia
                </button>
                <button 
                  onClick={() => setShowDeleteConfirm(true)}
                  className="w-full sm:w-auto text-red-500 hover:bg-red-500/10 font-bold px-8 py-5 rounded-3xl transition-all"
                >
                  Eliminar Entrada
                </button>
              </div>
            ) : (
              <div className="bg-red-900/10 border border-red-900/50 p-10 rounded-[2.5rem] flex flex-col items-center animate-in fade-in zoom-in duration-300">
                <div className="bg-red-600 p-4 rounded-full mb-4 shadow-xl shadow-red-900/40">
                  <AlertTriangle size={32} className="text-white" />
                </div>
                <h4 className="text-2xl font-black mb-2 text-white">¿Destruir noticia?</h4>
                <p className="text-gray-400 text-sm mb-8 text-center max-w-md">
                  Esta acción es irreversible. Se eliminará el registro principal y los {blocks.length} bloques de contenido asociados.
                </p>
                <div className="flex space-x-4 w-full max-w-xs">
                  <button 
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-2xl font-bold transition active:scale-95"
                  >
                    Cancelar
                  </button>
                  <button 
                    className="flex-1 bg-red-600 hover:bg-red-500 px-6 py-3 rounded-2xl font-bold transition shadow-lg shadow-red-900/40 active:scale-95"
                    onClick={() => { alert('Noticia eliminada del sistema'); setShowDeleteConfirm(false); }}
                  >
                    Sí, Eliminar
                  </button>
                </div>
              </div>
            )}
          </section>

        </div>
    </div>
  );
};

export default App;