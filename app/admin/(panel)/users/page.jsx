"use client";

import { useState, useEffect } from 'react';
import { toast } from "@/utils/toast";
import Switch from "@/components/admin/ui/Switch";
import Input from "@/components/admin/ui/Input"
import Select from "@/components/admin/ui/Select"
import ConfirmModal from '@/components/admin/ui/ConfirmModal';
import { ActionButton, SaveButton } from "@/components/admin/ui/ActionButtons"
import { Header } from '@/components/admin/Header';
import { Container, Th } from "@/components/admin/ui/Table";
import { formatDateAbsolute } from "@/utils/formatDate"
import { useFormErrors } from '@/hooks/useFormErrors';
import { confirmCreateUser } from "@/server/schemas/admin/password/confirmCreatePass";
import { confirmUpdateUser } from "@/server/schemas/admin/password/confirmUpdatePass";

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
  Lock
} from 'lucide-react';

export default function UsersAccount () {

  const initialFormState = {
    id: null,
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    active: 1
  };

  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const {errors, clearField, clearErrors, handleResponse, handleZodError} = useFormErrors();
  const [formData, setFormData] = useState(initialFormState);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error loading users:", error);
    }
  }
  fetchUsers();
  }, []);


  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
    }));
  };

  const handleEdit = (user) => {
    setFormData({
    id: user.id,
    username: user.username,
    email: user.email,
    password: '',
    confirmPassword: '',
    role: user.role,
    active: user.active
    });

    setIsEditing(true);
    clearErrors();
  };

  const handleCancel = () => {
    setFormData(initialFormState);
    setIsEditing(false);
    clearErrors();
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const dataToValidate = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      active: formData.active,
      role: formData.role,
    };

    const schema = isEditing ? confirmUpdateUser : confirmCreateUser;

    const result = schema.safeParse(dataToValidate);

    if (!result.success) {
      handleZodError(result.error);
      return;
    }

    const payload = {
      username: formData.username,
      email: formData.email,
      active: formData.active,
      role: formData.role,
      ...(formData.password && {
        password: formData.password
      })
    };

    try {
      const method = isEditing ? "PUT" : "POST";
      const url = isEditing 
        ? `/api/admin/users/${formData.id}` 
        : "/api/admin/users"

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data);
        handleResponse(data);
        return;
      }
      
      const listRes = await fetch("/api/admin/users");
      const list = await listRes.json();

      setUsers(list); 
      handleCancel();

      isEditing ? toast.updated("USUARIO ACTUALIZADO") : toast.created("USUARIO CREADO");

    } catch (error) {
      console.error("Error saving user:", error);
      toast.error("NO FUE POSIBLE GUARDAR EL USUARIO.");
    }
  };

  const handleChange = (e) => {
    handleInputChange(e);

    clearField(e.target.name);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) return;

      setUsers(prev => prev.filter(user => user.id !== id));

      toast.deleted("USUARIO ELIMINADO");

    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("NO FUE POSIBLE GUARDAR EL USUARIO");
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
      editor: 'bg-green-900/30 text-green-500 border-green-800'
    };
    return styles[role] || styles.editor;
  };

  const role = [
    { value: "superadmin", label: "Superadmin" },
    { value: "admin", label: "Administrador" },
    { value: "support", label: "Soporte" },
    { value: "editor", label: "Editor" },
  ]

  const labelStyles = "block text-sm font-black text-gray-500 uppercase mb-1 ml-1"

  return (
    <div className="h-full flex flex-col overflow-y-auto bg-gray-800 font-sans">

      <Header>
        <Header.Title>Administradores</Header.Title>
        <Header.Subtitle>Gestion de Administradores</Header.Subtitle>
      </Header>

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">
            <section className="bg-gray-900 rounded-3xl border border-gray-700 p-8 shadow-2xl relative overflow-hidden">
              <div className={`absolute top-0 left-0 w-full h-1.5 rounded-t-3xl transition-colors duration-500 ${isEditing ? 'bg-blue-500' : 'bg-green-800'}`}></div>
              
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <div className={`p-2.5 rounded-2xl mr-4 ${isEditing ? 'bg-blue-900/30 text-blue-500' : 'bg-green-900/30 text-green-600'}`}>
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
                    <label className={labelStyles}>Nombre de Usuario</label>
                    <div className="relative">
                      <Input
                        className="w-full"
                        type="text"
                        name="username"
                        placeholder="Ej. Juan Perez"
                        value={formData.username}
                        onChange={handleChange}
                        errors={errors}
                        icon={User}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelStyles}>Correo Electrónico</label>
                    <div className="relative">
                      <Input
                          className="w-full"
                          name="email"
                          placeholder="ejemplo@gmail.com"
                          value={formData.email}
                          onChange={handleChange}
                          errors={errors}
                          icon={Mail}
                        />
                    </div>
                  </div>
                  <div>
                    <label className={labelStyles}>Rol de Usuario</label>
                    <div className="relative">
                      <Select
                        className="w-full"
                        name="role"
                        placeholder="Selecciona un rol"
                        value={formData.role}
                        options={role}
                        errors={errors} 
                        onChange={handleChange}
                        onOpen={clearField}
                        icon={ShieldCheck}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelStyles}>Contraseña {isEditing && '(Opcional)'}</label>
                    <div className="relative">
                      <Input
                          className="w-full"
                          type="password"
                          name="password"
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={handleChange}
                          errors={errors}
                          icon={Lock}
                          PasswordToggle
                        />
                    </div>
                  </div>
                  <div>
                    <label className={labelStyles}>Confirmar Contraseña</label>
                    <div className="relative">
                      <Input
                          className="w-full"
                          type="password"
                          name="confirmPassword"
                          placeholder="••••••••"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          errors={errors}
                          icon={Lock}
                          PasswordToggle
                        />
                    </div>
                  </div>
                  <div className="flex items-end md:col-span-0">
                    <div className="w-full bg-gray-900 p-3 rounded-xl border border-gray-700 flex items-center justify-between">
                      <div className="flex flex-col ml-1">
                          <span className="text-xs font-bold text-gray-300 uppercase">Estado de la cuenta</span>
                      </div>
                        <Switch
                          name="active"
                          checked={formData.active === 1}
                          onChange={handleInputChange}
                        />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <SaveButton
                    type="submit"
                    icon={Save}
                    variant={isEditing ? "blue" : "green"}
                  >
                    {isEditing ? "Actualizar" : "Guardar"}
                  </SaveButton>
                </div>
              </form>
            </section>

            <section className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
                <h3 className="text-xl font-bold flex items-center text-white">
                  <Users size={25} className="mr-4 text-green-700" />
                  Directorio de Usuarios
                </h3>

                <div className="relative group">
                  <Input
                    type="text"
                    placeholder="Buscar por usuario o email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className=" w-full md:w-96"
                    icon={Search}
                  />
                </div>
              </div>

              <Container>
                  <thead className="bg-gray-800/40 text-gray-400 border-b border-gray-800">
                    <tr>
                      <Th>Usuario / ID</Th>
                      <Th>Contacto</Th>
                      <Th>Privilegios</Th>
                      <Th>Estado</Th>
                      <Th>Acciones</Th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-800">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-800/40 transition group">
                        <td className="px-8 py-6">
                          <div className="flex items-center space-x-4">
                            <div className="w-14 h-14 rounded-2xl bg-gray-900 border border-gray-800 shadow-lg flex items-center justify-center">
                              <User size={24} className="text-gray-400"/>
                            </div>

                            <div>
                              <div className="text-base font-bold text-white group-hover:text-green-700 transition-colors">
                                {user.username}
                              </div>
                              <div className="text-sm text-gray-500 mt-1">
                                ID #{user.id}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-8 py-6">
                          <div className="flex items-center text-sm text-gray-400">
                            <Mail size={14} className="mr-2 text-gray-600" />
                            {user.email}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            Creado: {formatDateAbsolute(user.created_at)}
                          </div>
                        </td>

                        <td className="px-8 py-6">
                          <span
                            className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest 
                              ${getRoleBadge( user.role )}`}>
                            {user.role}
                          </span>
                        </td>

                        <td className="px-8 py-6">
                          {user.active === 1 ? (
                            <div className="flex items-center text-green-600 text-xs font-bold uppercase tracking-wider">
                              <CheckCircle size={12} className="mr-1.5" />
                              Activo
                            </div>
                          ) : (
                            <div className="flex items-center text-gray-500 text-xs font-bold uppercase tracking-wider">
                              <XCircle size={12} className="mr-1.5" />
                              Inactivo
                            </div>
                          )}
                        </td>

                        <td className="px-8 py-6 text-right">
                          <div className="flex space-x-2">
                            <ActionButton
                              icon={Edit3}
                              title="Editar"
                              hoverColor="hover:bg-blue-600"
                              onClick={() => handleEdit(user)}
                            />
                            <ActionButton
                              icon={Trash2}
                              title="Eliminar"
                              hoverColor="hover:bg-red-600"
                              onClick={() => setUserToDelete(user)}
                            />
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
                  <tfoot>
                    <tr>
                      <td colSpan="5" className="bg-gray-800/40 p-5 border-t border-gray-800">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-black text-gray-400 pl-4 uppercase tracking-widest">
                            Total:<span className="text-green-600"> {users.length}</span> Administradores 
                          </span>
                        </div>
                      </td>
                    </tr>
                  </tfoot>
              </Container>
            </section>
          </div>
      </div>
      <ConfirmModal
        open={!!userToDelete}
        title="¿Eliminar Usuario?"
        description={`¿Deseas eliminar el usuario" ${userToDelete?.username}"?`}
        confirmText="Eliminar"
        onCancel={() => setUserToDelete(null)}
        onConfirm={() => {
          handleDelete(userToDelete.id);
          setUserToDelete(null);
        }}
      />
    </div>
  );
};