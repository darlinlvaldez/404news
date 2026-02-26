"use client";

import { useState, useEffect } from 'react';
import { 
  Trash2, 
  Save, 
  Search,
  Edit3,
  Users,
  Camera,
  CheckCircle,
  XCircle,
  Mail,
  Lock,
  UserCircle,
  ShieldAlert,
  KeyRound
} from 'lucide-react';

export default function AuthorsPage() {
  const initialFormState = {
    username: '',
    email: '',
    password: '',
    role: 'author',
    active: 1,
    name: '',
    bio: '',
    slug: '',
    avatar: '',
  };

  const [authors, setAuthors] = useState([
    { 
      id: 1, 
      user_id: 101,
      name: 'Juan Pérez', 
      email: 'juan@404news.com',
      username: 'juanperez',
      role: 'author',
      bio: 'Periodista especializado en tecnología con 10 años de experiencia.', 
      slug: 'juan-perez', 
      avatar: 'https://i.pravatar.cc/150?u=1', 
      active: 1 
    },
    { 
      id: 2, 
      user_id: 102,
      name: 'Ana García', 
      email: 'ana@404news.com',
      username: 'anagarcia',
      role: 'editor',
      bio: 'Analista internacional y experta en política económica.', 
      slug: 'ana-garcia', 
      avatar: 'https://i.pravatar.cc/150?u=2', 
      active: 1 
    }
  ]);

  const [formData, setFormData] = useState(initialFormState);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (formData.name && !isEditing) {
      const baseString = formData.name
        .toLowerCase()
        .trim()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
      
      setFormData(prev => ({ 
        ...prev, 
        slug: baseString,
        username: baseString.replace(/-/g, '') 
      }));
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
    setFormData({ ...author, password: '' }); 
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setFormData(initialFormState);
    setIsEditing(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      if (isEditing) {
        setAuthors(authors.map(a => a.id === formData.id ? { ...formData } : a));
      } else {
        const newAuthor = {
          ...formData,
          id: authors.length + 1,
          user_id: Math.floor(Math.random() * 1000)
        };
        setAuthors([newAuthor, ...authors]);
      }
      setIsLoading(false);
      handleCancel();
    }, 800);
  };

  const filteredAuthors = authors.filter(a => 
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    a.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 bg-[#0b0f1a] text-gray-200 overflow-y-auto">
      <header className="sticky top-0 z-20 bg-[#161b2a]/80 backdrop-blur-md px-8 py-6 border-b border-slate-800 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-black text-white tracking-tight">Gestión Editorial</h2>
          <p className="text-[10px] text-emerald-500 uppercase font-bold tracking-[0.2em]">Autores y Cuentas de Usuario</p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">
        
        {/* Formulario de Registro Dual (User + Author) */}
        <section className="bg-[#161b2a] rounded-[2.5rem] border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className={`absolute top-0 left-0 w-full h-1.5 transition-colors duration-500 ${isEditing ? 'bg-blue-500' : 'bg-emerald-600'}`}></div>
          
          <div className="p-8 md:p-10">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center">
                <div className={`p-3 rounded-2xl mr-5 ${isEditing ? 'bg-blue-500/10 text-blue-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                  {isEditing ? <Edit3 size={24} /> : <UserCircle size={24} />}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{isEditing ? 'Modificar Colaborador' : 'Registrar Nuevo Colaborador'}</h3>
                  <p className="text-xs text-slate-500 mt-1">Se creará simultáneamente un usuario y un perfil de autor.</p>
                </div>
              </div>
              {isEditing && (
                <button onClick={handleCancel} className="text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-widest transition-colors">
                  Cancelar Edición
                </button>
              )}
            </div>

            <form onSubmit={handleSave} className="space-y-8">
              {/* Sección: Datos de Cuenta (users) */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-emerald-500 mb-4">
                  <KeyRound size={14} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Credenciales de Acceso</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase ml-1">Email Profesional</label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-emerald-500 transition-colors" size={16} />
                      <input 
                        type="email" name="email" value={formData.email} onChange={handleInputChange} required
                        placeholder="email@404news.com"
                        className="w-full bg-[#0b0f1a] border border-slate-800 rounded-xl pl-12 pr-4 py-3.5 text-sm focus:ring-2 focus:ring-emerald-600 outline-none transition text-white"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase ml-1">Contraseña</label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-emerald-500 transition-colors" size={16} />
                      <input 
                        type="password" name="password" value={formData.password} onChange={handleInputChange} 
                        required={!isEditing}
                        placeholder={isEditing ? "••••••••" : "Mínimo 8 caracteres"}
                        className="w-full bg-[#0b0f1a] border border-slate-800 rounded-xl pl-12 pr-4 py-3.5 text-sm focus:ring-2 focus:ring-emerald-600 outline-none transition text-white"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase ml-1">Rol de Usuario</label>
                    <div className="relative">
                      <ShieldAlert className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                      <select 
                        name="role" value={formData.role} onChange={handleInputChange}
                        className="w-full bg-[#0b0f1a] border border-slate-800 rounded-xl pl-12 pr-4 py-3.5 text-sm focus:ring-2 focus:ring-emerald-600 outline-none appearance-none text-white cursor-pointer"
                      >
                        <option value="author">Autor (Colaborador)</option>
                        <option value="editor">Editor (Gestor)</option>
                        <option value="admin">Administrador</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sección: Datos de Perfil (authors) */}
              <div className="pt-6 border-t border-slate-800/50 space-y-4">
                <div className="flex items-center space-x-2 text-emerald-500 mb-4">
                  <Camera size={14} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Información Pública (Perfil)</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase ml-1">Nombre para Mostrar</label>
                    <input 
                      type="text" name="name" value={formData.name} onChange={handleInputChange} required
                      placeholder="Ej. Juan Pérez"
                      className="w-full bg-[#0b0f1a] border border-slate-800 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-emerald-600 outline-none transition text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase ml-1">Slug del Perfil (Auto)</label>
                    <input 
                      type="text" name="slug" value={formData.slug} onChange={handleInputChange} required
                      className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-slate-500 font-mono outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase ml-1">URL Avatar / Foto</label>
                    <input 
                      type="text" name="avatar" value={formData.avatar} onChange={handleInputChange} required
                      placeholder="https://images.com/perfil.jpg"
                      className="w-full bg-[#0b0f1a] border border-slate-800 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-emerald-600 outline-none transition text-white"
                    />
                  </div>
                  <div className="flex items-end pb-1">
                    <div className="w-full bg-emerald-500/5 p-3.5 rounded-xl border border-emerald-500/10 flex items-center justify-between">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Estado de la cuenta</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" name="active" checked={formData.active === 1} onChange={handleInputChange} className="sr-only peer" />
                        <div className="w-11 h-6 bg-slate-800 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600 peer-checked:after:bg-white"></div>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase ml-1">Biografía Corta</label>
                  <textarea 
                    name="bio" value={formData.bio} onChange={handleInputChange} required rows="3"
                    className="w-full bg-[#0b0f1a] border border-slate-800 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-emerald-600 outline-none resize-none transition text-white"
                    placeholder="Describe la trayectoria del autor..."
                  ></textarea>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button 
                  type="submit"
                  disabled={isLoading}
                  className={`px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center transition shadow-2xl active:scale-95 disabled:opacity-50 ${isEditing ? 'bg-blue-600 hover:bg-blue-500 shadow-blue-900/20 text-white' : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-900/20 text-white'}`}
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Save size={18} className="mr-3" /> 
                      {isEditing ? 'Actualizar Colaborador' : 'Crear Cuenta y Perfil'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Listado con Filtros */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
            <h3 className="text-xl font-bold flex items-center text-slate-400">
              <Users size={22} className="mr-4 text-emerald-500" />
              Directorio de Equipo
            </h3>
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-emerald-500 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Buscar por nombre, email o slug..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-[#161b2a] border border-slate-800 rounded-2xl pl-12 pr-4 py-3 text-sm w-full md:w-96 focus:ring-2 focus:ring-emerald-600 outline-none transition text-white"
              />
            </div>
          </div>

          <div className="bg-[#161b2a] rounded-[2.5rem] border border-slate-800 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-800/30 text-slate-500 text-[10px] uppercase font-black tracking-[0.2em] border-b border-slate-800">
                  <tr>
                    <th className="px-8 py-6">Usuario & Perfil</th>
                    <th className="px-8 py-6">Biografía</th>
                    <th className="px-8 py-6">Rol</th>
                    <th className="px-8 py-6">Estado</th>
                    <th className="px-8 py-6 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {filteredAuthors.map((author) => (
                    <tr key={author.id} className="hover:bg-slate-800/20 transition group">
                      <td className="px-8 py-6">
                        <div className="flex items-center space-x-4">
                          <img src={author.avatar} alt={author.name} className="w-14 h-14 rounded-2xl object-cover bg-slate-900 border border-slate-800 shadow-lg" />
                          <div>
                            <div className="text-sm font-bold text-white group-hover:text-emerald-500 transition-colors">{author.name}</div>
                            <div className="text-[10px] text-slate-500 font-mono mt-1">{author.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <p className="text-xs text-slate-400 max-w-xs line-clamp-2 leading-relaxed">"{author.bio}"</p>
                      </td>
                      <td className="px-8 py-6">
                        <span className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-[9px] font-black text-slate-400 uppercase tracking-widest">
                          {author.role}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className={`flex items-center text-[10px] font-black uppercase tracking-widest ${author.active === 1 ? 'text-emerald-500' : 'text-slate-600'}`}>
                          {author.active === 1 ? <CheckCircle size={14} className="mr-2" /> : <XCircle size={14} className="mr-2" />}
                          {author.active === 1 ? 'Activo' : 'Inactivo'}
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end space-x-2">
                          <button 
                            onClick={() => handleEdit(author)}
                            className="p-3 bg-[#0b0f1a] hover:bg-blue-600 text-slate-600 hover:text-white rounded-xl transition shadow-md"
                          >
                            <Edit3 size={16} />
                          </button>
                          <button 
                            className="p-3 bg-[#0b0f1a] hover:bg-red-600 text-slate-600 hover:text-white rounded-xl transition shadow-md"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-slate-800/20 p-5 border-t border-slate-800 flex justify-between items-center px-8">
              <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">Total: {filteredAuthors.length} colaboradores</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}