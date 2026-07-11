"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { useNewsForm } from '@/components/admin/news/UseNewsForm';
import { Header } from '@/components/admin/Header';
import { GeneralData } from '@/components/admin/news/GeneralData';
import { ContentBlocks } from '@/components/admin/news/ContentBlocks';
import { ActionButtons } from '@/components/admin/news/ActionButtons';
import { useFormErrors } from '@/hooks/useFormErrors';

export default function CreateNews() {
  const router = useRouter();
  
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { errors, clearField, handleResponse } = useFormErrors();

  const {
    newsData,
    blocks,
    handleInputChange,
    addBlock,
    removeBlock,
    updateBlock,
    moveBlock,
  } = useNewsForm();

  const onSave = async () => {
    const payload = {
      news: newsData,
      blocks
    };

    const res = await fetch("/api/admin/news", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (res.ok) {
      router.push("/admin/news");
      return;
    }

    handleResponse(data);
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

  const onBack = () => {
    router.push('/admin/news');
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-800">
      <Header onSave={onSave} onBack={onBack}>
        <Header.Title>Noticia</Header.Title>
        <Header.Subtitle>Crear Nueva Noticia </Header.Subtitle>
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
            onSave={onSave}
            blocksCount={blocks.length}
          />
        </section>
      </div>
    </div>
  );
}