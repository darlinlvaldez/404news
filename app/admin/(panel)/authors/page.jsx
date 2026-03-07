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

  const [authors, setAuthors] = useState([]);

  const [formData, setFormData] = useState(initialFormState);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
  const fetchAuthors = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/authors");
      const data = await res.json();
      setAuthors(data);
    } catch (err) {
      console.error("Error fetching authors:", err);
    } finally {
      setIsLoading(false);
    }
  };

  fetchAuthors();
}, []);

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

  try {
    const method = isEditing ? "PUT" : "POST";
    const url = isEditing 
      ? `/api/admin/authors/${formData.id}` 
      : `/api/admin/authors`;

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await res.json();

    if (isEditing) {
      setAuthors(authors.map(a => a.id === result.id ? result : a));
    } else {
      setAuthors([result, ...authors]);
    }

    handleCancel();
  } catch (err) {
    console.error("Error saving author:", err);
  } finally {
    setIsLoading(false);
  }
};

const handleDelete = async (id) => {
  if (!confirm("¿Seguro que quieres eliminar este autor?")) return;

  setIsLoading(true);
  try {
    const res = await fetch(`/api/admin/authors/${id}`, {
      method: "DELETE",
    });
    const result = await res.json();
    setAuthors(authors.filter(a => a.id !== result.deletedId));
  } catch (err) {
    console.error("Error deleting author:", err);
  } finally {
    setIsLoading(false);
  }
};

  const filteredAuthors = authors.filter(a => 
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    a.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 bg-gray-800 text-gray-200 overflow-y-auto">
      <header className="sticky top-0 z-20 bg-gray-900 backdrop-blur-md px-8 py-6 border-b border-gray-700 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-black text-white tracking-tight">Gestión Editorial</h2>
          <p className="text-sm text-green-7x00 uppercase font-bold tracking-[0.2em]">Autores y Cuentas de Usuario</p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">
        
        <section className="bg-gray-900 rounded-4xl border border-gray-700 shadow-2xl relative overflow-hidden">
          <div className={`absolute top-0 left-0 w-full h-1.5 transition-colors duration-500 ${isEditing ? 'bg-blue-500' : 'bg-green-800'}`}></div>
          
          <div className="p-8 md:p-10">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center">
                <div className={`p-3 rounded-2xl mr-5 ${isEditing ? 'bg-blue-500/10 text-blue-500' : 'bg-green-500/10 text-green-700'}`}>
                  {isEditing ? <Edit3 size={24} /> : <UserCircle size={24} />}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{isEditing ? 'Modificar Colaborador' : 'Registrar Nuevo Colaborador'}</h3>
                  <p className="text-base text-gray-500 mt-1">Se creará simultáneamente un usuario y un perfil de autor.</p>
                </div>
              </div>
              {isEditing && (
                <button onClick={handleCancel} className="text-sm font-black text-gray-500 hover:text-white uppercase tracking-widest transition-colors">
                  Cancelar Edición
                </button>
              )}
            </div>

            <form onSubmit={handleSave} className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-green-700 mb-4">
                  <KeyRound size={20} />
                  <span className="text-lg font-black uppercase tracking-widest">Credenciales de Acceso</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-black text-gray-500 uppercase ml-1">Email Profesional</label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-green-700 transition-colors" size={20} />
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="email@gmail.com"
                        className="w-full bg-gray-950 border border-gray-700 rounded-xl pl-12 pr-4 py-3.5 text-sm 
                        focus:ring-2 focus:ring-green-700 outline-none transition text-white"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-black text-gray-500 uppercase ml-1">Contraseña</label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-green-700 transition-colors" size={20}/>
                      <input type="password" name="password" value={formData.password} onChange={handleInputChange} 
                        required={!isEditing} placeholder={isEditing ? "••••••••" : "Mínimo 6 caracteres"}
                        className="w-full bg-gray-950 border border-gray-700 rounded-xl pl-12 pr-4 py-3.5 text-sm focus:ring-2 focus:ring-green-700 outline-none transition text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-800 space-y-4">
                <div className="flex items-center space-x-2 text-green-700 mb-4">
                  <Camera size={20}/>
                  <span className="text-lg font-black uppercase tracking-widest">Información Pública (Perfil)</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-black text-gray-500 uppercase ml-1">Nombre para Mostrar</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Ej. Juan Pérez"
                      className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-3.5 text-sm 
                      focus:ring-2 focus:ring-green-700 outline-none transition text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-black text-gray-500 uppercase ml-1">Slug del Perfil (Auto)</label>
                    <input type="text" name="slug" value={formData.slug} onChange={handleInputChange} required
                      className="w-full bg-gray-950 border border-gray-700 focus:ring-2 focus:ring-green-700 
                      rounded-xl px-4 py-3.5 text-sm text-white font-mono outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-black text-gray-500 uppercase ml-1">URL Avatar / Foto</label>
                    <input type="text" name="avatar" value={formData.avatar} onChange={handleInputChange} placeholder="https://images.com/perfil.jpg"
                      className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-3.5 text-sm 
                      focus:ring-2 focus:ring-green-700 outline-none transition text-white"
                    />
                  </div>
                  <div className="flex items-end pb-1">
                    <div className="w-full p-3.5 rounded-xl border border-gray-700 flex items-center justify-between">
                      <span className="text-sm font-black text-gray-400 uppercase tracking-widest">Estado de la cuenta</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" name="active" checked={formData.active === 1} onChange={handleInputChange} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-800 rounded-full peer peer-checked:after:trangray-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                        after:bg-gray-400 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-700 peer-checked:after:bg-white">
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-black text-gray-500 uppercase ml-1">Biografía Corta</label>
                  <textarea name="bio" value={formData.bio} onChange={handleInputChange} rows="3"
                    className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-3.5 text-sm 
                    focus:ring-2 focus:ring-green-700 outline-none resize-none transition text-white"
                    placeholder="Describe la trayectoria del autor...">
                  </textarea>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button type="submit" disabled={isLoading}
                  className={`px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center transition shadow-2xl active:scale-95 disabled:opacity-50 
                    ${isEditing ? 'bg-blue-600 hover:bg-blue-500 shadow-blue-900/20 text-white' : 'bg-green-800 hover:bg-emerald-700 shadow-emerald-900/20 text-white'}`}
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Save size={20} className="mr-3" /> 
                      {isEditing ? 'Actualizar' : 'Guardar'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
            <h3 className="text-xl font-bold flex items-center text-white">
              <Users size={25} className="mr-4 text-green-700" />
              Directorio de Equipo
            </h3>
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-green-700 transition-colors" size={20} />
              <input type="text" placeholder="Buscar por nombre, email o slug..." value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-950 border border-gray-700 rounded-2xl pl-12 pr-4 py-3 text-sm w-full md:w-96 
                focus:ring-2 focus:ring-green-700 outline-none transition text-white"
              />
            </div>
          </div>

          <div className="bg-gray-900 rounded-4xl border border-gray-700 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-800/30 text-gray-500 text-sm uppercase font-black tracking-[0.2em] border-b border-gray-800">
                  <tr>
                    <th className="px-8 py-6">Usuario & Perfil</th>
                    <th className="px-8 py-6">Biografía</th>
                    <th className="px-8 py-6">Rol</th>
                    <th className="px-8 py-6">Estado</th>
                    <th className="px-8 py-6 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {filteredAuthors.map((author) => (
                    <tr key={author.id} className="hover:bg-gray-800/20 transition group">
                      <td className="px-8 py-6">
                        <div className="flex items-center space-x-4">
                          <img src={author.avatar || "/images/notfoundimage.jpg"} alt={author.name} 
                          className="w-14 h-14 rounded-2xl object-cover bg-gray-900 border border-gray-800 shadow-lg" />
                          <div>
                            <div className="text-base font-bold text-white group-hover:text-green-700 transition-colors">{author.name}</div>
                            <div className="text-sm text-gray-500 font-mono mt-1">{author.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <p className="text-sm text-gray-400 max-w-xs line-clamp-2 leading-relaxed">{author.bio}</p>
                      </td>
                      <td className="px-8 py-6">
                        <span className="px-3 py-1.5 bg-gray-900 border border-gray-800 rounded-xl text-xs font-black text-gray-400 uppercase tracking-widest">
                          {author.role}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className={`flex items-center text-xs font-black uppercase tracking-widest ${author.active === 1 ? 'text-green-600' : 'text-gray-600'}`}>
                          {author.active === 1 ? <CheckCircle size={18} className="mr-2" /> : <XCircle size={18} className="mr-2" />}
                          {author.active === 1 ? 'Activo' : 'Inactivo'}
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end space-x-2">
                          <button 
                            onClick={() => handleEdit(author)}
                            className="p-3 bg-gray-800 hover:bg-blue-600 text-gray-500 hover:text-white rounded-xl transition shadow-md"
                          >
                            <Edit3 size={20} />
                          </button>
                          <button onClick={() => handleDelete(author.id)}
                            className="p-3 bg-gray-800 hover:bg-red-600 text-gray-500 hover:text-white rounded-xl transition shadow-md"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-gray-800/20 p-5 border-t border-gray-800 flex justify-between items-center px-8">
              <span className="text-sm text-gray-500 font-black uppercase tracking-[0.2em]">Total: {filteredAuthors.length} colaboradores</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}