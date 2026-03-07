"use client";

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useNewsForm } from '@/components/admin/news/UseNewsForm';
import { Header } from '@/components/admin/Header';
import { GeneralData } from '@/components/admin/news/GeneralData';
import { ContentBlocks } from '@/components/admin/news/ContentBlocks';
import { ActionButtons } from '@/components/admin/news/ActionButtons';

import { useParams } from "next/navigation";

export default function EditNews() {
  const params = useParams();
  const id = params.id;

  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  
const {
  newsData,
  blocks,
  showDeleteConfirm,
  setShowDeleteConfirm,
  handleInputChange,
  addBlock,
  removeBlock,
  updateBlock,
  moveBlock,
  handleSave,
  handleDelete,
  setFormData
} = useNewsForm();

useEffect(() => {
  const fetchFormData = async () => {
    try {
      const response = await fetch("/api/admin/news/form-data");
      const data = await response.json();

      if (data.ok) {
        setAuthors(data.authors);
        setCategories(data.categories);
      }
    } catch (error) {
      console.error(error);
    }
  };

  fetchFormData();
}, []);

useEffect(() => {
  if (!id) return;

  const fetchNews = async () => {
    try {
      const response = await fetch(`/api/admin/news/${id}`);
      const data = await response.json();

      if (data.ok) {
        setFormData(data.news, data.blocks);
      }

      setLoading(false);

    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  fetchNews();
}, [id]);

  const onSave = () => {
  handleSave(id, () => {
    alert('¡Noticia actualizada con éxito!');
    router.push('/admin/news');
  });
};

  const onDelete = () => {
    handleDelete(id, () => {
      alert("Noticia eliminada del sistema");
      router.push("/admin/news");
    });
  };

  const onBack = () => {
    router.push('/admin/news');
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-gray-400">Cargando noticia...</div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <Header
        views={newsData.views}
        onSave={onSave}
        onBack={onBack}
        >
        <Header.Title>Noticia</Header.Title>
        <Header.Subtitle>Editor de Contenido</Header.Subtitle>
      </Header>

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-12">
        <GeneralData 
          newsData={newsData}
          onInputChange={handleInputChange}
          authors={authors}
          categories={categories}
        />

        <ContentBlocks 
          blocks={blocks}
          onAddBlock={addBlock}
          onRemoveBlock={removeBlock}
          onUpdateBlock={updateBlock}
          onMoveBlock={moveBlock}
        />

        <section className="pt-12 border-t border-gray-700">
          <ActionButtons 
            showDeleteConfirm={showDeleteConfirm}
            onSetShowDeleteConfirm={setShowDeleteConfirm}
            onSave={onSave}
            onDelete={onDelete}
            blocksCount={blocks.length}
          />
        </section>
      </div>
    </div>
  );
}