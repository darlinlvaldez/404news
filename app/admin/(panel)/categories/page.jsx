"use client";

import { useState, useEffect } from 'react';
import { 
  Trash2, 
  PlusCircle, 
  Save, 
  Search,
  Edit3,
  CheckCircle,
  XCircle,
} from 'lucide-react';

export default function CategoriesPage () {
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    id: null,
    name: '',
    slug: '',
    active: 1
  });

  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
  fetch("/api/admin/categories")
    .then(res => res.json())
    .then(data => setCategories(data));
}, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
    }));
  };

  const handleEdit = (category) => {
    setFormData(category);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setFormData({ id: null, name: '', slug: '', active: 1 });
    setIsEditing(false);
  };

  const handleSave = async (e) => {
  e.preventDefault();

  if (isEditing) {
    await fetch(`/api/admin/categories/${formData.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
  } else {
    await fetch("/api/admin/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
  }

  const res = await fetch("/api/admin/categories");
  const data = await res.json();
  setCategories(data);

  handleCancel();
};

const handleDelete = async (id) => {
  await fetch(`/api/admin/categories/${id}`, {
    method: "DELETE",
  });

  setCategories(prev => prev.filter(c => c.id !== id));
};

  const filteredCategories = categories.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-800 text-gray-100 flex font-sans">

      <div className="flex-1 overflow-y-auto">
        <header className="sticky top-0 z-20 bg-gray-900 backdrop-blur-md px-8 py-4 border-b border-gray-700 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold leading-none">Gestión de Categorías</h2>
            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">Configuración del Sistema</span>
          </div>
        </header>

        <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">
          
          <section className="bg-gray-900 rounded-3xl border border-gray-700 p-8 shadow-2xl relative">
            <div className={`absolute top-0 left-0 w-full h-1 rounded-t-3xl transition-colors duration-500 ${isEditing ? 'bg-blue-500' : 'bg-green-600'}`}></div>
            
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <div className={`p-2.5 rounded-2xl mr-4 ${isEditing ? 'bg-blue-900/30 text-blue-500' : 'bg-green-900/30 text-green-500'}`}>
                  {isEditing ? <Edit3 size={22} /> : <PlusCircle size={22} />}
                </div>
                <h3 className="text-xl font-bold">{isEditing ? 'Editar Categoría' : 'Nueva Categoría'}</h3>
              </div>
              {isEditing && (
                <button onClick={handleCancel} className="text-xs font-bold text-gray-500 hover:text-white uppercase tracking-widest transition">
                  Cancelar Edición
                </button>
              )}
            </div>

            <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
              <div className="md:col-span-1">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Nombre de Categoría</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange}
                  placeholder="Ej. Tecnología, Salud..."
                  className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-green-600 outline-none transition"
                />
              </div>
              <div className="md:col-span-1">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">URL (Slug)</label>
                <input type="text" name="slug" value={formData.slug} onChange={handleInputChange}
                  className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-400 font-mono outline-none"
                />
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex-1 bg-gray-900 p-3 rounded-xl border border-gray-700 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-gray-500 uppercase ml-1">Estado</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" name="active" checked={formData.active === 1} onChange={handleInputChange} className="sr-only peer" />
                    <div className="w-10 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>
                <button 
                  type="submit"
                  className={`px-6 py-3 rounded-xl font-bold flex items-center transition shadow-lg 
                  ${isEditing ? 'bg-blue-600 hover:bg-blue-500' : 'bg-green-600 hover:bg-green-500'}`}>
                  <Save size={18} className="mr-2" /> {isEditing ? 'Actualizar' : 'Guardar'}
                </button>
              </div>
            </form>
          </section>

          <section className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h3 className="text-xl font-bold flex items-center">
                <Search size={20} className="mr-3 text-gray-500" />
                Listado de Categorías
              </h3>
              <div className="relative">
                <input type="text" placeholder="Buscar categorías..." value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-gray-950 border border-gray-700 rounded-2xl pl-10 pr-4 py-2.5 
                  text-sm w-full md:w-80 focus:ring-2 focus:ring-green-600 outline-none transition"
                />
                <Search className="absolute left-3 top-3 text-gray-600" size={16} />
              </div>
            </div>

            <div className="bg-gray-900 rounded-4xl border border-gray-700 overflow-hidden shadow-xl">
              <table className="w-full text-left">
                <thead className="bg-gray-800/50 text-gray-500 text-[10px] uppercase font-black tracking-widest">
                  <tr>
                    <th className="px-8 py-5">ID</th>
                    <th className="px-8 py-5">Nombre / Slug</th>
                    <th className="px-8 py-5">Estado</th>
                    <th className="px-8 py-5">Fecha Creación</th>
                    <th className="px-8 py-5 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {filteredCategories.map((cat) => (
                    <tr key={cat.id} className="hover:bg-gray-800/30 transition group">
                      <td className="px-8 py-5 text-sm font-mono text-gray-500">#{cat.id}</td>
                      <td className="px-8 py-5">
                        <div className="text-sm font-bold text-gray-100">{cat.name}</div>
                        <div className="text-[10px] text-gray-500 font-mono italic">{cat.slug}</div>
                      </td>
                      <td className="px-8 py-5">
                        {cat.active === 1 ? (
                          <div className="flex items-center text-green-500 text-[10px] font-bold uppercase tracking-wider">
                            <CheckCircle size={12} className="mr-1.5" /> Activa
                          </div>
                        ) : (
                          <div className="flex items-center text-gray-500 text-[10px] font-bold uppercase tracking-wider">
                            <XCircle size={12} className="mr-1.5" /> Inactiva
                          </div>
                        )}
                      </td>
                      <td className="px-8 py-5 text-xs text-gray-500 italic">
                        {cat.created_at}
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex justify-end space-x-2">
                          <button onClick={() => handleEdit(cat)}
                            className="p-2 bg-gray-800 hover:bg-blue-600 text-gray-400 hover:text-white rounded-xl transition shadow-md"
                            title="Editar"
                          >
                            <Edit3 size={16} />
                          </button>
                          <button onClick={() => handleDelete(cat.id)}
                            className="p-2 bg-gray-800 hover:bg-red-600 text-gray-400 hover:text-white rounded-xl transition shadow-md"
                            title="Eliminar"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredCategories.length === 0 && (
                    <tr>
                      <td colSpan="5" className="px-8 py-20 text-center text-gray-600 italic">
                        No se encontraron categorías que coincidan con la búsqueda.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="bg-gray-900/50 p-4 border-t border-gray-800 flex justify-between items-center px-8">
                <span className="text-[10px] text-gray-500 font-bold uppercase">Total: {filteredCategories.length} categorías</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};