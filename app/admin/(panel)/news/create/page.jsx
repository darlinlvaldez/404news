"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { toast } from "@/utils/toast";
import { UseNewsState } from '@/components/admin/news/UseNewsState';
import { Header } from '@/components/admin/Header';
import { GeneralData } from '@/components/admin/news/GeneralData';
import { ContentBlocks } from '@/components/admin/news/ContentBlocks';
import { useFormErrors } from '@/hooks/useFormErrors';
import { ActionButton } from '@/components/admin/ui/ActionButtons';

import { Save } from "lucide-react";

export default function CreateNews() {
  const router = useRouter();
  
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { errors, clearField, handleResponse } = useFormErrors();
  const [generatingAI, setGeneratingAI] = useState(false);

  const {
    newsData,
    blocks,
    handleInputChange,
    addBlock,
    removeBlock,
    updateBlock,
    moveBlock,
  } = UseNewsState();

  const handleSave = async () => {
    try {
      const payload = {
        news: newsData,
        blocks,
      };

      const res = await fetch("/api/admin/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        handleResponse(data);
        return;
      }

      toast.success("NOTICIA CREADA",
         "La información se ha guardado correctamente."
      );
      router.push("/admin/news");

    } catch (error) {
      console.error(error);
      toast.error("OCURRIÓ UN ERROR INESPERADO",
        "No fue posible guardar la noticia"
      );
    }
  };

  const handleChange = (e) => {
    handleInputChange(e);
    clearField(e.target.name);
    
    if (e.target.name === "title") {
        clearField("slug");
    }
  };

  useEffect(() => {
    const fetchFormData = async () => {
      const res = await fetch("/api/admin/news/form-data");
      const data = await res.json();

      if (data.ok) {
        setAuthors(data.authors);
        setCategories(data.categories);
      }

      setLoading(false);
    };

    fetchFormData();
  }, []);


  const handleGenerateAI = async () => {
    const hasContent = blocks.some((b) => b.content?.trim());

    if (!hasContent) {
      toast.error("AGREGÁ CONTENIDO ANTES DE GENERAR CON IA");
      return;
    }

    const category = categories.find(
      c => c.id === newsData.category_id
    );

    setGeneratingAI(true);

    try {
      const res = await fetch("/api/admin/news/generate-ai", {
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

  const onBack = () => {
    router.push('/admin/news');
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-800">
      <Header
        onBack={onBack}
        actions={
          <ActionButton icon={Save} variant="green" onClick={handleSave}>
            Guardar Noticia
          </ActionButton>
        }
      >
        <Header.Title>Noticia</Header.Title>
        <Header.Subtitle>Crear Nueva Noticia </Header.Subtitle>
      </Header>

      <button type="button" onClick={handleGenerateAI} disabled={generatingAI}>
  {generatingAI ? "Generando..." : "Generar con IA"}
</button>

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

        <section className="pt-12 border-t items-center justify-center border-gray-700">
          <ActionButton
            className="w-full h-16"
            icon={Save}
            variant="green"
            onClick={handleSave}
            disabled={generatingAI}
          >
            Guardar Noticia
          </ActionButton>
        </section>
      </div>
    </div>
  );
}