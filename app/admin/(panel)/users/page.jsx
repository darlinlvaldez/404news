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
  Users,
  ShieldCheck,
  Mail,
  User,
  Key
} from 'lucide-react';

export default function UsersAccount () {
  const [users, setUsers] = useState([]);

  const [formData, setFormData] = useState({
    id: null,
    username: '',
    email: '',
    password: '',
    role: 'editor',
    active: 1
  });

const fetchUsers = async () => {
  try {
    const res = await fetch("/api/admin/users");
    const data = await res.json();
    setUsers(data);
  } catch (error) {
    console.error("Error loading users:", error);
  }
};

useEffect(() => {
  fetchUsers();
}, []);

  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
    }));
  };

  const handleEdit = (user) => {
    setFormData({ ...user, password: '' });
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setFormData({ id: null, username: '', email: '', password: '', role: 'editor', active: 1 });
    setIsEditing(false);
  };

const handleSave = async (e) => {
  e.preventDefault();

  try {
    if (isEditing) {
      await fetch(`/api/admin/users/${formData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } else {
      await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    }

    await fetchUsers(); 
    handleCancel();
  } catch (error) {
    console.error("Error saving user:", error);
  }
};

const handleDelete = async (id) => {
  if (!confirm("Are you sure you want to delete this user?")) return;

  try {
    await fetch(`/api/admin/users/${id}`, {
      method: "DELETE",
    });

    await fetchUsers();
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

  const filteredUsers = users.filter(u => 
    u.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadge = (role) => {
    const styles = {
      superadmin: 'bg-purple-900/30 text-purple-400 border-purple-800',
      admin: 'bg-blue-900/30 text-blue-400 border-blue-800',
      support: 'bg-orange-900/30 text-orange-400 border-orange-800',
      editor: 'bg-green-900/30 text-green-400 border-green-800'
    };
    return styles[role] || styles.editor;
  };

  return (
      <div className="flex-1 overflow-y-auto bg-gray-800">
        <header className="sticky top-0 z-20 bg-gray-900/90 backdrop-blur-md px-8 py-4 border-b border-gray-700 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold leading-none">Gestión de Accesos</h2>
            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">Control de Seguridad</span>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">
          
          <section className="bg-gray-900 rounded-3xl border border-gray-700 p-8 shadow-2xl relative">
            <div className={`absolute top-0 left-0 w-full h-1 rounded-t-3xl transition-colors duration-500 ${isEditing ? 'bg-orange-500' : 'bg-green-600'}`}></div>
            
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <div className={`p-2.5 rounded-2xl mr-4 ${isEditing ? 'bg-orange-900/30 text-orange-500' : 'bg-green-900/30 text-green-500'}`}>
                  {isEditing ? <Edit3 size={22} /> : <PlusCircle size={22} />}
                </div>
                <h3 className="text-xl font-bold">{isEditing ? 'Actualizar Usuario' : 'Crear Nuevo Usuario'}</h3>
              </div>
              {isEditing && (
                <button onClick={handleCancel} className="text-xs font-bold text-gray-500 hover:text-white uppercase tracking-widest transition">
                  Cancelar Edición
                </button>
              )}
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Nombre de Usuario</label>
                  <div className="relative">
                    <input type="text" name="username" value={formData.username} onChange={handleInputChange} placeholder="usuario_123"
                      className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-green-600 outline-none pl-10 transition"
                    />
                    <User className="absolute left-3 top-3.5 text-gray-500" size={20} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Correo Electrónico</label>
                  <div className="relative">
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="correo@ejemplo.com"
                      className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-green-600 outline-none pl-10 transition"
                    />
                    <Mail className="absolute left-3 top-3.5 text-gray-500" size={20} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Rol de Usuario</label>
                  <div className="relative">
                    <select name="role" value={formData.role} onChange={handleInputChange}
                      className="w-full bg-gray-950 border border-gray-700 cursor-pointer rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-green-600 outline-none appearance-none transition"
                    >
                      <option value="superadmin">Superadmin</option>
                      <option value="admin">Administrador</option>
                      <option value="support">Soporte</option>
                      <option value="editor">Editor</option>
                    </select>
                    <ShieldCheck className="absolute right-4 top-3.5 text-gray-500 pointer-events-none" size={20} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Contraseña {isEditing && '(Opcional)'}</label>
                  <div className="relative">
                    <input type="password" name="password" value={formData.password} onChange={handleInputChange} required={!isEditing} placeholder="••••••••"
                      className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-green-600 outline-none pl-10 transition"
                    />
                    <Key className="absolute left-3 top-3.5 text-gray-500" size={20} />
                  </div>
                </div>
                <div className="flex items-end md:col-span-2">
                  <div className="w-full bg-gray-900 p-3 rounded-xl border border-gray-700 flex items-center justify-between">
                    <div className="flex flex-col ml-1">
                        <span className="text-[10px] font-bold text-gray-300 uppercase">Estado de la cuenta</span>
                        <span className="text-[9px] text-gray-500 italic">Determina si el usuario puede iniciar sesión</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" name="active" checked={formData.active === 1} onChange={handleInputChange} className="sr-only peer" />
                      <div className="w-12 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-gray-800">
                <button type="submit" className={`px-10 py-4 rounded-2xl font-bold flex items-center transition shadow-lg 
                ${isEditing ? 'bg-orange-600 hover:bg-orange-500 shadow-orange-900/20' : 'bg-green-600 hover:bg-green-500 shadow-green-900/20'}`}
                >
                  <Save size={18} className="mr-2" /> {isEditing ? 'Confirmar Cambios' : 'Registrar Usuario'}
                </button>
              </div>
            </form>
          </section>

          <section className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h3 className="text-xl font-bold flex items-center text-gray-400">
                <Users size={20} className="mr-3" />
                Directorio de Usuarios
              </h3>
              <div className="relative">
                <input type="text" placeholder="Buscar usuario o email..." value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-gray-950 border border-gray-700 rounded-2xl pl-10 pr-4 py-3 text-sm w-full md:w-96 focus:ring-2 focus:ring-green-600 outline-none transition shadow-inner"
                />
                <Search className="absolute left-3 top-3.5 text-gray-500" size={20} />
              </div>
            </div>

            <div className="bg-gray-900 rounded-3xl border border-gray-700 overflow-hidden shadow-xl">
              <table className="w-full text-left">
                <thead className="bg-gray-800/50 text-gray-500 text-[10px] uppercase font-black tracking-widest border-b border-gray-800">
                  <tr>
                    <th className="px-8 py-5">Usuario / ID</th>
                    <th className="px-8 py-5">Contacto</th>
                    <th className="px-8 py-5">Privilegios</th>
                    <th className="px-8 py-5">Estado</th>
                    <th className="px-8 py-5 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-800/30 transition group">
                      <td className="px-8 py-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700 text-gray-400 group-hover:border-green-600 transition">
                            <User size={20} />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-gray-100">{user.username}</div>
                            <div className="text-[10px] text-gray-500 font-mono italic">UID: {user.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center text-xs text-gray-300">
                            <Mail size={12} className="mr-2 text-gray-600" />
                            {user.email}
                        </div>
                        <div className="text-[9px] text-gray-600 mt-1 uppercase font-bold tracking-tighter">Creado: {user.created_at}</div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase border ${getRoleBadge(user.role)}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        {user.active === 1 ? (
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
                        <div className="flex justify-end space-x-2 opacity-60 group-hover:opacity-100 transition">
                          <button onClick={() => handleEdit(user)}
                            className="p-2.5 bg-gray-800 hover:bg-orange-600 text-gray-400 hover:text-white rounded-xl transition shadow-md"
                            title="Editar"
                          >
                            <Edit3 size={20} />
                          </button>
                          <button onClick={() => handleDelete(user.id)}
                            className="p-2.5 bg-gray-800 hover:bg-red-600 text-gray-400 hover:text-white rounded-xl transition shadow-md"
                            title="Eliminar"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredUsers.length === 0 && (
                    <tr>
                      <td colSpan="5" className="px-8 py-20 text-center text-gray-600 italic">
                        No se han encontrado registros de usuarios.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="bg-gray-800/50 p-4 border-t border-gray-800 flex justify-between items-center px-8">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Registros activos: {users.filter(u => u.active).length}</span>
              </div>
            </div>
          </section>
        </div>
    </div>
  );
};