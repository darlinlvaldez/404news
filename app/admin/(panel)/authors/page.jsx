"use client";

import { useState, useEffect } from 'react';
import { toast } from "@/utils/toast";
import Switch from "@/components/admin/ui/Switch";
import Input from "@/components/admin/ui/Input"
import ConfirmModal from '@/components/admin/ui/ConfirmModal';
import { ActionButton, SaveButton } from "@/components/admin/ui/ActionButtons"
import { Header } from '@/components/admin/Header';
import { Container, Th } from "@/components/admin/ui/Table";
import { useFormErrors } from '@/hooks/useFormErrors';
import { useAutoSlug } from '@/utils/autoSlug';
import { confirmCreateAuthor } from "@/server/schemas/admin/password/confirmCreatePass";
import { confirmUpdateAuthor } from "@/server/schemas/admin/password/confirmUpdatePass";

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
  User,
  Lock,
  UserCircle,
  KeyRound
} from 'lucide-react';

export default function AuthorsPage() {
  const initialFormState = {
    id: null,
    email: '',
    password: '',
    confirmPassword: '',
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
  const {errors, clearField, clearErrors, handleResponse, handleZodError} = useFormErrors();
  const [authorToDelete, setAuthorToDelete] = useState(null);

  useEffect(() => {
    const fetchAuthors = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/admin/authors");
        const data = await res.json();
        setAuthors(data);
      } catch (err) {
        console.error("Error loading authors:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  const { handleSlugChange } = useAutoSlug({
    source: formData.name,
    slug: formData.slug,
    setSlug: (slug) =>
      setFormData((prev) => ({
        ...prev,
        slug,
      }))
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "slug") {
      handleSlugChange(value);
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
    }));
  };

  const handleChange = (e) => {
    handleInputChange(e);

    clearField(e.target.name);

    if (e.target.name === "name") {
      clearField("slug");
    }
  };

  const handleEdit = (author) => {
    setFormData({
      id: author.id,
      email: author.email,
      password: '',
      confirmPassword: '',
      active: author.active,
      name: author.name,
      bio: author.bio,
      slug: author.slug,
      avatar: author.avatar,
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
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      active: formData.active,
      name: formData.name,
      slug: formData.slug,
      avatar: formData.avatar,
      bio: formData.bio,
    };

    const schema = isEditing ? confirmUpdateAuthor : confirmCreateAuthor;

    const result = schema.safeParse(dataToValidate);

    if (!result.success) {
      handleZodError(result.error);
      return;
    }
    
    setIsLoading(true);

    const payload = {
      email: formData.email,
      active: formData.active,
      name: formData.name,
      slug: formData.slug,
      avatar: formData.avatar,
      bio: formData.bio,
      ...(formData.password && {
        password: formData.password
      })
    };

    try {
     const method = isEditing ? "PUT" : "POST";
      const url = isEditing
        ? `/api/admin/authors/${formData.id}`
        : "/api/admin/authors";

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
      
      const listRes = await fetch("/api/admin/authors");
      const list = await listRes.json();

      setAuthors(list);
      handleCancel();
    
      isEditing ? toast.updated("AUTOR ACTUALIZADO") : toast.created("AUTOR CREADO");

    } catch (err) {
      console.error("Error saving author:", err);
      toast.error("NO FUE POSIBLE GUARDAR EL AUTOR.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/authors/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();

      console.log(result);
      
      setAuthors(prev => prev.filter(a => a.id !== result.deletedId));

    } catch (err) {
      console.error("Error deleting author:", err);
      toast.error("NO FUE POSIBLE GUARDAR EL AUTOR");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredAuthors = authors.filter(a => 
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    a.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const labelStyles = "block text-sm font-black text-gray-500 uppercase mb-1 ml-1"

  return (
    <div className="h-full flex flex-col overflow-y-auto bg-gray-800 text-gray-200 font-sans">
      <Header>
        <Header.Title>Autores</Header.Title>
        <Header.Subtitle>Gestion de Autores</Header.Subtitle>
      </Header>

      <div className="flex-1 overflow-y-auto">
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
                      <label className={labelStyles}>Email Profesional</label>
                      <div className="relative group">
                        <Input
                          className="w-full"
                          name="email"
                          placeholder="ejemplo@gmail.com"
                          value={formData.email}
                          onChange={handleChange}
                          icon={Mail}
                          errors={errors}
                          />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className={labelStyles}>
                          {isEditing ? "Contraseña (opcional)" : "Contraseña"}</label>
                        <div className="relative group">
                          <Input
                            className="w-full"
                            type="password"
                            name="password"
                            required={!isEditing} 
                            placeholder={isEditing ? "••••••••" : "Mínimo 6 caracteres"}
                            value={formData.password}
                            onChange={handleChange}
                            icon={Lock}
                            errors={errors}
                            PasswordToggle
                            />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className={labelStyles}>Confirmar contraseña</label>
                        <Input
                          type="password"
                          name="confirmPassword"
                          placeholder={isEditing ? "••••••••" : "Mínimo 6 caracteres"}
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          icon={Lock}
                          errors={errors}
                          PasswordToggle
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
                      <label className={labelStyles}>Nombre para Mostrar</label>
                      <Input
                          className="w-full"
                          type="text"
                          name="name"
                          placeholder="Ej. Juan Pérez"
                          value={formData.name}
                          onChange={handleChange}
                          icon={User}
                          errors={errors}
                        />
                    </div>
                    <div className="space-y-2">
                      <label className={labelStyles}>Slug del Perfil</label>
                      <Input
                          className="w-full"
                          type="text"
                          name="slug"
                          placeholder="Ej. Manuel-luis-investigador"
                          value={formData.slug}
                          onChange={handleChange}
                          errors={errors}
                        />
                    </div>
                    <div className="space-y-2">
                      <label className={labelStyles}>URL Avatar / Foto</label>
                      <Input
                          className="w-full"
                          type="text"
                          name="avatar"
                          placeholder="Archivo o URL"
                          value={formData.avatar}
                          onChange={handleChange}
                          icon={Camera}
                          errors={errors}
                        />
                    </div>
                    <div className="flex items-end">
                      <div className="w-full p-3.5 rounded-xl border border-gray-700 flex items-center justify-between">
                        <span className="text-sm font-black text-gray-400 uppercase tracking-widest">Estado de la cuenta</span>
                        <Switch
                          name="active"
                          checked={formData.active === 1}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className={labelStyles}>Biografía Corta</label>
                    <textarea name="bio" value={formData.bio} onChange={handleInputChange} rows="3"
                      className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-3.5 text-sm placeholder:text-gray-500
                      focus:ring-1 focus:ring-green-800 outline-none focus:border-transparent resize-none transition text-white"
                      placeholder="Describe la trayectoria del autor...">
                    </textarea>
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
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
              <h3 className="text-xl font-bold flex items-center text-white">
                <Users size={25} className="mr-4 text-green-700" />
                Directorio de Equipo
              </h3>
              <div className="relative group">
                <Input type="text" 
                  placeholder="Buscar por nombre, email o slug..." 
                  value={searchTerm}
                  icon={Search}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full md:w-96 py-3 text-sm"
                />
              </div>
            </div>

            <Container>
                <thead className="bg-gray-800/40 text-gray-400 border-b border-gray-800">
                  <tr>
                    <Th>Usuario & Perfil</Th>
                    <Th>Biografía</Th>
                    <Th>Privilegios</Th>
                    <Th>Publicaciones</Th>
                    <Th>Estado</Th>
                    <Th>Acciones</Th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {filteredAuthors.map((author) => (
                    <tr key={author.id} className="hover:bg-gray-800/40 transition group">
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
                        <span className="px-3 py-1.5 text-xs font-black text-gray-400 uppercase tracking-widest">
                          {author.news_count} noticias
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        {author.active === 1 ? (
                          <div className="flex items-center text-green-600 text-xs font-bold uppercase tracking-wider">
                            <CheckCircle size={12} className="mr-1.5" /> Activa
                          </div>
                        ) : (
                          <div className="flex items-center text-gray-500 text-xs font-bold uppercase tracking-wider">
                            <XCircle size={12} className="mr-1.5" /> Inactiva
                          </div>
                        )}
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end space-x-2">
                          <ActionButton
                            icon={Edit3}
                            title="Editar"
                            hoverColor="hover:bg-blue-600"
                            onClick={() => handleEdit(author)}
                          />
                          <ActionButton
                            icon={Trash2}
                            title="Eliminar"
                            hoverColor="hover:bg-red-600"
                            onClick={() => setAuthorToDelete(author)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}

                  {filteredAuthors.length === 0 && (
                    <tr>
                      <td colSpan="5" className="px-8 py-20 text-center text-gray-600 italic">
                        No se han encontrado registros de usuarios autores.
                      </td>
                    </tr>
                  )}
                  </tbody>

                <tfoot>
                <tr>
                  <td colSpan="6" className="bg-gray-800/40 p-5 border-t border-gray-800">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400 font-black uppercase tracking-widest">
                        Total: <span className="text-green-600">{filteredAuthors.length}</span> colaboradores
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
      open={!!authorToDelete}
      title="¿Eliminar autor?"
      description={`¿Deseas eliminar el autor "${authorToDelete?.name}"?`}
      confirmText="Eliminar"
      onCancel={() => setAuthorToDelete(null)}
      onConfirm={() => {
        handleDelete(authorToDelete.id);
        setAuthorToDelete(null);
      }}
    />
  </div>
  );
}