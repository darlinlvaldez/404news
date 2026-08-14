"use client";

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useParams } from "next/navigation";
import { toast } from "@/utils/toast";
import { useNewsState } from '@/hooks/useNewsState';
import { Header } from '@/components/admin/Header';
import { GeneralData } from '@/components/admin/news/GeneralData';
import { ContentBlocks } from '@/components/admin/news/ContentBlocks';
import { useFormErrors } from '@/hooks/useFormErrors';
import { ActionButton } from '@/components/admin/ui/ActionButtons';
import ConfirmModal from '@/components/admin/ui/ConfirmModal';

import { Save, Trash2 } from "lucide-react";

export default function EditNews() {
  const params = useParams();
  const id = params.id;

  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [generatingAI, setGeneratingAI] = useState(false);
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
  } = useNewsState();

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

      console.log(data)

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

  const normalizeBlock = (block) => {
    switch (block.block_type) {
      case "paragraph":
      case "heading":
        return {
          block_type: block.block_type,
          content: block.content,
          position: block.position,
        };

      case "image":
        return {
          block_type: block.block_type,
          image_url: block.image_url,
          alt_text: block.alt_text ?? undefined,
          position: block.position,
        };

      default:
        throw new Error(`Tipo de bloque desconocido: ${block.block_type}`);
    }
  };

  const blocksPayload = blocks.map(normalizeBlock);

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
          rejection_reason: newsData.rejection_reason,
        },
        blocks: blocksPayload,
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

      toast.success("NOTICIA ACTUALIZADA");
      router.push("/admin/news");

    } catch (error) {
      console.error(error);
      toast.error("Ocurrió un error inesperado.");
    }
  };

  const handleGenerateAI = async () => {
    const hasContent = blocks.some((b) => b.content?.trim());

    if (!hasContent) {
      toast.error("AGREGA CONTENIDO ANTES DE GENERAR CON IA");
      return;
    }

    const category = categories.find(
      c => c.id === newsData.category_id
    );

    setGeneratingAI(true);

    try {
      const res = await fetch("/api/generate-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
        news: { ...newsData, category_name: category?.name ?? "",},
          blocks,
        })
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        toast.error(data.message || "NO SE PUDO GENERAR CON IA");
        return;
      }

      handleInputChange({ target: { name: "title", value: data.title } });
      handleInputChange({ target: { name: "slug", value: data.slug } });
      handleInputChange({ target: { name: "excerpt", value: data.excerpt } });
      clearField("title");
      clearField("slug");
      clearField("excerpt");

      toast.success("CAMPOS GENERADOS CON IA");
    } catch (error) {
      console.error(error);
      toast.error("OCURRIÓ UN ERROR INESPERADO");
    } finally {
      setGeneratingAI(false);
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

      toast.success("NOTICIA ELIMINADA");
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
        onBack={onBack}
        actions={
          <ActionButton icon={Save} variant="green" onClick={handleSave}>
            Guardar Noticia
          </ActionButton>
        }
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
          onGenerateAI={handleGenerateAI}
          generatingAI={generatingAI}
          errors={errors}
          clearField={clearField}
          isEdit={true}
        />

        <ContentBlocks 
          blocks={blocks}
          onAddBlock={addBlock}
          onRemoveBlock={removeBlock}
          onUpdateBlock={updateBlock}
          onMoveBlock={moveBlock}
          errors={errors}
          clearField={clearField}
        />

        <section className="pt-12 border-t border-gray-700">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <ActionButton
              icon={Save}
              variant="green"
              className="w-full sm:flex-1 py-5 font-black justify-center"
              onClick={handleSave}
              disabled={generatingAI}
            >
              Confirmar y Guardar Noticia
            </ActionButton>

            <ActionButton
              icon={Trash2}
              variant="ghostRed"
              className="w-full sm:w-auto px-8 py-5 rounded-3xl justify-center"
              onClick={() => setShowDeleteConfirm(true)}
              disabled={generatingAI}
            >
              Eliminar Entrada
            </ActionButton>
          </div>
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