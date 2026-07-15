"use client";

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useParams } from "next/navigation";
import { toast } from "@/utils/toast";
import { UseNewsState } from '@/components/admin/news/UseNewsState';
import { Header } from '@/components/admin/Header';
import { GeneralData } from '@/components/admin/news/GeneralData';
import { ContentBlocks } from '@/components/admin/news/ContentBlocks';
import { ActionButtons } from '@/components/admin/news/ActionButtons';
import { useFormErrors } from '@/hooks/useFormErrors';
import ConfirmModal from '@/components/admin/ui/ConfirmModal';

export default function EditNews() {
  const params = useParams();
  const id = params.id;

  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const { errors, clearField, handleResponse } = useFormErrors();
  
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
    setFormData
  } = UseNewsState();

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

  
  const handleChange = (e) => {
    handleInputChange(e);
    clearField(e.target.name);
    
    if (e.target.name === "title") {
        clearField("slug");
    }
  };

  const handleSave = async () => {
    try {
      const payload = {
        news: {
          title: newsData.title,
          slug: newsData.slug,
          excerpt: newsData.excerpt,
          cover_image: newsData.cover_image,
          author_id: newsData.author_id,
          category_id: newsData.category_id,
          status: newsData.status,
        },
        blocks,
      };

      const response = await fetch(`/api/admin/news/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        handleResponse(data);
        return;
      }

      toast.updated("NOTICIA ACTUALIZADA");
      router.push("/admin/news");

    } catch (error) {
      console.error(error);
      toast.error("Ocurrió un error inesperado.");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/admin/news/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!data.ok) {
        alert(data.message);
        return;
      }

      toast.created("NOTICIA ELIMINADA");
      router.push("/admin/news");

    } catch (error) {
      console.error(error);
      toast.error("OCURRIÓ UN ERROR INESPERADO");
    }

    setShowDeleteConfirm(false);
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
    <div className="flex-1 bg-gray-800 overflow-y-auto">
      <Header
        views={newsData.views}
        onSave={handleSave}
        onBack={onBack}
        >
        <Header.Title>Noticia</Header.Title>
        <Header.Subtitle>Editor de Contenido</Header.Subtitle>
      </Header>

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-12">
        <GeneralData 
          newsData={newsData}
          onInputChange={handleChange}
          authors={authors}
          categories={categories}
          errors={errors}
          clearField={clearField}
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
            onSave={handleSave}
            onDelete={() => setShowDeleteConfirm(true)}
            blocksCount={blocks.length}
          />
        </section>
      </div>
      <ConfirmModal
        open={showDeleteConfirm}
        title="¿Eliminar noticia?"
        description={`Esta acción es irreversible. Se eliminará el registro principal y los bloques asociados.`}
        confirmText="Eliminar"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </div>
  );
}