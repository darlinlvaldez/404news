"use client";

import { useState, useEffect } from 'react';
import { Header } from '@/components/admin/Header';
import {ActionButton, SaveButton} from "@/components/admin/ui/ActionButtons"
import Input from "@/components/admin/ui/Input"
import Switch from "@/components/admin/ui/Switch";
import { Container, Th } from "@/components/admin/ui/Table";
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
      <Header>
        <Header.Title>Categorias</Header.Title>
        <Header.Subtitle>Gestion de Categorias</Header.Subtitle>
      </Header>

        <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">
          
          <section className="bg-gray-900 rounded-4xl border border-gray-700 p-8 shadow-2xl relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-full h-1.5 transition-colors duration-500 ${isEditing ? 'bg-blue-500' : 'bg-green-800'}`}></div>
            
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <div className={`p-2.5 rounded-2xl mr-4 ${isEditing ? 'bg-blue-900/30 text-blue-500' : 'bg-green-900/30 text-green-700'}`}>
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
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Nombre de Categoría</label>
                <Input
                className="w-full"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Ej. Tecnología, Salud..."
                />
              </div>
              <div className="md:col-span-1">
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">URL (Slug)</label>
                <Input
                className="w-full"
                value={formData.slug}
                onChange={handleInputChange}
                />
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex-1 bg-gray-900 p-3 rounded-xl border border-gray-700">
                  <Switch
                    label="Estado"
                    name="active"
                    checked={formData.active === 1}
                    onChange={handleInputChange}
                  />
                </div>
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
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h3 className="text-xl font-bold flex items-center">
                <Search size={20} className="mr-3 text-gray-500" />
                Listado de Categorías
              </h3>
              <div className="relative">
                <Input
                className="w-96"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar categorías..."
                icon={Search}
                />
              </div>
            </div>

            <Container>
               <thead className="bg-gray-800/50 text-gray-400 text-xs uppercase font-black tracking-widest">
                  <tr>
                    <Th>ID</Th>
                    <Th>Nombre / Slug</Th>
                    <Th>Estado</Th>
                    <Th>Fecha Creación</Th>
                    <Th>Acciones</Th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {filteredCategories.map((cat) => (
                    <tr key={cat.id} className="hover:bg-gray-800/20 transition group">
                      <td className="px-8 py-6 text-sm font-mono text-white">#{cat.id}</td>
                      <td className="px-8 py-5">
                        <h3 className="text-sm font-bold text-white group-hover:text-green-700">{cat.name}</h3>
                        <span className="text-xs text-gray-500 font-mono italic">{cat.slug}</span>
                      </td>
                      <td className="px-8 py-5">
                        {cat.active === 1 ? (
                          <div className="flex items-center text-green-500 text-xs font-bold uppercase tracking-wider">
                            <CheckCircle size={15} className="mr-1.5" /> Activa
                          </div>
                        ) : (
                          <div className="flex items-center text-gray-500 text-xs font-bold uppercase tracking-wider">
                            <XCircle size={15} className="mr-1.5" /> Inactiva
                          </div>
                        )}
                      </td>
                      <td className="px-8 py-5 text-xs text-gray-500 italic">
                        {cat.created_at}
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex justify-end space-x-2">
                          <ActionButton
                            icon={Edit3}
                            title="Editar"
                            hoverColor="hover:bg-blue-600"
                            onClick={() => handleEdit(cat)}
                          />
                          <ActionButton
                            icon={Trash2}
                            title="Eliminar"
                            hoverColor="hover:bg-red-600"
                            onClick={() => handleDelete(cat.id)}
                          />
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
              <tfoot>
                <tr>
                  <td colSpan="5" className="bg-gray-800/50 p-4 border-t border-gray-800">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400 font-bold pl-4 uppercase">
                        Total: {filteredCategories.length} categorías
                      </span>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </Container>
          </section>
        </div>
      </div>
    </div>
  );
};