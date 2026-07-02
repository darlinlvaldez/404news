"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { useNewsForm } from '@/components/admin/news/UseNewsForm';
import { Header } from '@/components/admin/Header';
import { GeneralData } from '@/components/admin/news/GeneralData';
import { ContentBlocks } from '@/components/admin/news/ContentBlocks';
import { ActionButtons } from '@/components/admin/news/ActionButtons';

export default function CreateNews() {
  const router = useRouter();
  
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (data.ok) {
    alert("¡Noticia creada con éxito!");
    router.push("/admin/news");
  } else {
    alert(data.message);
  }
};

  useEffect(() => {
    const fetchFormData = async () => {
      const res = await fetch("/api/admin/news/form-data");
      const data = await res.json();

      console.log(data);

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
            onSave={onSave}
            blocksCount={blocks.length}
          />
        </section>
      </div>
    </div>
  );
}