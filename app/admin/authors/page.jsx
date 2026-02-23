"use client";

import { useState, useEffect } from 'react';
import { 
  Trash2, 
  PlusCircle, 
  Save, 
  Search,
  Edit3,
  Users,
  Camera,
  CheckCircle,
  XCircle
} from 'lucide-react';

const App = () => {
  const [authors, setAuthors] = useState([
    { id: 1, name: 'Juan Pérez', bio: 'Periodista especializado en tecnología con 10 años de experiencia.', slug: 'juan-perez', avatar: 'https://i.pravatar.cc/150?u=1', active: 1 },
    { id: 2, name: 'Ana García', bio: 'Analista internacional y experta en política económica.', slug: 'ana-garcia', avatar: 'https://i.pravatar.cc/150?u=2', active: 1 },
    { id: 3, name: 'Carlos Ruiz', bio: 'Escritor y entusiasta de los deportes de motor.', slug: 'carlos-ruiz', avatar: 'https://i.pravatar.cc/150?u=3', active: 0 },
  ]);

  const [formData, setFormData] = useState({
    id: null,
    name: '',
    bio: '',
    slug: '',
    avatar: '',
    active: 1
  });

  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (formData.name && !isEditing) {
      const generatedSlug = formData.name
        .toLowerCase()
        .trim()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
      setFormData(prev => ({ ...prev, slug: generatedSlug }));
    }
  }, [formData.name, isEditing]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
    }));
  };

  const handleEdit = (author) => {
    setFormData(author);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setFormData({ id: null, name: '', bio: '', slug: '', avatar: '', active: 1 });
    setIsEditing(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (isEditing) {
      setAuthors(authors.map(a => a.id === formData.id ? { ...formData } : a));
    } else {
      const newAuthor = {
        ...formData,
        id: authors.length + 1
      };
      setAuthors([newAuthor, ...authors]);
    }
    handleCancel();
  };

  const filteredAuthors = authors.filter(a => 
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    a.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
      <div className="flex-1 overflow-y-auto">
        <header className="sticky top-0 z-20 bg-gray-900/90 backdrop-blur-md px-8 py-4 border-b border-gray-700 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold leading-none">Gestión de Autores</h2>
            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">Equipo Editorial</span>
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
                <h3 className="text-xl font-bold">{isEditing ? 'Editar Perfil de Autor' : 'Nuevo Autor'}</h3>
              </div>
              {isEditing && (
                <button onClick={handleCancel} className="text-xs font-bold text-gray-500 hover:text-white uppercase tracking-widest transition">
                  Cancelar Edición
                </button>
              )}
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Nombre Completo</label>
                  <input 
                    type="text" name="name" value={formData.name} onChange={handleInputChange} required
                    placeholder="Ej. Juan Pérez"
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-green-600 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Slug / URL</label>
                  <input 
                    type="text" name="slug" value={formData.slug} onChange={handleInputChange} required
                    className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-400 font-mono outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">URL Avatar</label>
                  <div className="relative">
                    <input 
                      type="text" name="avatar" value={formData.avatar} onChange={handleInputChange} required
                      placeholder="https://..."
                      className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-green-600 outline-none pl-10"
                    />
                    <Camera className="absolute left-3 top-3.5 text-gray-600" size={16} />
                  </div>
                </div>
                <div className="flex items-end pb-1">
                  <div className="w-full bg-gray-800/50 p-3 rounded-xl border border-gray-700 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-gray-500 uppercase ml-1">Autor Activo</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" name="active" checked={formData.active === 1} onChange={handleInputChange} className="sr-only peer" />
                      <div className="w-10 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Biografía</label>
                <textarea 
                  name="bio" value={formData.bio} onChange={handleInputChange} required rows="3"
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-green-600 outline-none resize-none transition"
                  placeholder="Escribe una breve biografía del autor..."
                ></textarea>
              </div>

              <div className="flex justify-end">
                <button 
                  type="submit"
                  className={`px-8 py-4 rounded-2xl font-bold flex items-center transition shadow-lg ${isEditing ? 'bg-blue-600 hover:bg-blue-500 shadow-blue-900/20' : 'bg-green-600 hover:bg-green-500 shadow-green-900/20'}`}
                >
                  <Save size={18} className="mr-2" /> {isEditing ? 'Actualizar Autor' : 'Registrar Autor'}
                </button>
              </div>
            </form>
          </section>

          <section className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h3 className="text-xl font-bold flex items-center text-gray-400">
                <Users size={20} className="mr-3" />
                Listado de Autores
              </h3>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Buscar por nombre o slug..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-gray-900 border border-gray-700 rounded-2xl pl-10 pr-4 py-2.5 text-sm w-full md:w-80 focus:ring-2 focus:ring-green-600 outline-none transition shadow-inner"
                />
                <Search className="absolute left-3 top-3 text-gray-600" size={16} />
              </div>
            </div>

            <div className="bg-gray-900 rounded-3xl border border-gray-700 overflow-hidden shadow-xl">
              <table className="w-full text-left">
                <thead className="bg-gray-800/50 text-gray-500 text-[10px] uppercase font-black tracking-widest border-b border-gray-800">
                  <tr>
                    <th className="px-8 py-5">Perfil</th>
                    <th className="px-8 py-5">Biografía</th>
                    <th className="px-8 py-5">Estado</th>
                    <th className="px-8 py-5 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {filteredAuthors.map((author) => (
                    <tr key={author.id} className="hover:bg-gray-800/30 transition group">
                      <td className="px-8 py-6">
                        <div className="flex items-center space-x-4">
                          <img src={author.avatar} alt={author.name} className="w-12 h-12 rounded-2xl object-cover bg-gray-800 border border-gray-700" />
                          <div>
                            <div className="text-sm font-bold text-gray-100">{author.name}</div>
                            <div className="text-[10px] text-gray-500 font-mono uppercase tracking-tighter">slug: {author.slug}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <p className="text-xs text-gray-400 max-w-xs line-clamp-2 leading-relaxed italic">"{author.bio}"</p>
                      </td>
                      <td className="px-8 py-6">
                        {author.active === 1 ? (
                          <div className="flex items-center text-green-500 text-[10px] font-bold uppercase">
                            <CheckCircle size={14} className="mr-2" /> Activo
                          </div>
                        ) : (
                          <div className="flex items-center text-gray-500 text-[10px] font-bold uppercase">
                            <XCircle size={14} className="mr-2" /> Suspendido
                          </div>
                        )}
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end space-x-2">
                          <button 
                            onClick={() => handleEdit(author)}
                            className="p-2.5 bg-gray-800 hover:bg-blue-600 text-gray-400 hover:text-white rounded-xl transition shadow-md"
                            title="Editar Perfil"
                          >
                            <Edit3 size={16} />
                          </button>
                          <button 
                            className="p-2.5 bg-gray-800 hover:bg-red-600 text-gray-400 hover:text-white rounded-xl transition shadow-md"
                            title="Eliminar"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredAuthors.length === 0 && (
                    <tr>
                      <td colSpan="4" className="px-8 py-20 text-center text-gray-600 italic">
                        No se encontraron autores en el sistema.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="bg-gray-900/50 p-4 border-t border-gray-800 flex justify-between items-center px-8">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Total: {filteredAuthors.length} colaboradores</span>
              </div>
            </div>
          </section>
        </div>
    </div>
  );
};

export default App;