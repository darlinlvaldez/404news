"use client";

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useNewsForm } from '@/hooks/seNewsForm';
import { NewsHeader } from '@/components/NewsHeader';
import { GeneralData } from '@/components/GeneralData';
import { ContentBlocks } from '@/components/ContentBlocks';
import { ActionButtons } from '@/components/ActionButtons';

export default function EditNews({ params }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const newsDataFromAPI = {
          id: params.id,
          title: 'Noticia de ejemplo',
          slug: 'noticia-de-ejemplo',
          excerpt: 'Este es un resumen de ejemplo',
          cover_image: 'https://ejemplo.com/imagen.jpg',
          author_id: '1',
          category_id: '1',
          status: 'published',
          active: true,
          views: 150
        };

        const blocksFromAPI = [
          { id: 1, block_type: 'heading', content: 'Título de ejemplo', position: 1 },
          { id: 2, block_type: 'paragraph', content: 'Párrafo de ejemplo', position: 2 },
          { id: 3, block_type: 'image', content: '', image_url: 'https://ejemplo.com/img.jpg', alt_text: 'Descripción', position: 3 }
        ];

        setFormData(newsDataFromAPI, blocksFromAPI);
        setLoading(false);
      } catch (error) {
        console.error('Error cargando noticia:', error);
        setLoading(false);
      }
    };

    fetchNews();
  }, [params.id]);

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

  const onSave = () => {
    handleSave((payload) => {
      alert('¡Noticia actualizada con éxito!');
      router.push('/noticias');
    });
  };

  const onDelete = () => {
    handleDelete(() => {
      alert('Noticia eliminada del sistema');
      router.push('/noticias');
    });
  };

  const onBack = () => {
    router.push('/noticias');
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
      <NewsHeader 
        title={newsData.title}
        views={newsData.views}
        onSave={onSave}
        onBack={onBack}
      />

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-12">
        <GeneralData 
          newsData={newsData}
          onInputChange={handleInputChange}
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