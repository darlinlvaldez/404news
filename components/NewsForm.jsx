"use client";

import { useState, useEffect } from 'react';

export const useNewsForm = (initialNews = null, initialBlocks = null) => {
  const [newsData, setNewsData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    cover_image: '',
    author_id: '',
    category_id: '',
    status: 'draft',
    active: true,
    views: 0,
    ...initialNews
  });

  const [blocks, setBlocks] = useState(
    initialBlocks || [
      { id: 1, block_type: 'heading', content: '', position: 1 },
      { id: 2, block_type: 'paragraph', content: '', position: 2 }
    ]
  );

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewsData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  useEffect(() => {
    if (newsData.title && !initialNews) {
      const generatedSlug = newsData.title
        .toLowerCase()
        .trim()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
      setNewsData(prev => ({ ...prev, slug: generatedSlug }));
    }
  }, [newsData.title, initialNews]);

  const addBlock = (type) => {
    const newBlock = {
      id: Date.now(),
      block_type: type,
      content: '',
      image_url: '',
      alt_text: '',
      position: blocks.length + 1
    };
    setBlocks([...blocks, newBlock]);
  };

  const removeBlock = (id) => {
    const filtered = blocks.filter(b => b.id !== id);
    const reordered = filtered.map((b, index) => ({ ...b, position: index + 1 }));
    setBlocks(reordered);
  };

  const updateBlock = (id, field, value) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, [field]: value } : b));
  };

  const moveBlock = (index, direction) => {
    const newBlocks = [...blocks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newBlocks.length) return;

    [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]];
    
    const updatedPositions = newBlocks.map((b, idx) => ({ ...b, position: idx + 1 }));
    setBlocks(updatedPositions);
  };

  const handleSave = async (onSuccess) => {
    const payload = { 
      news: newsData, 
      blocks: blocks 
    };
    console.log('Payload estructurado para API:', payload);
    
    if (onSuccess) {
      onSuccess(payload);
    }
  };

  const handleDelete = async (onDelete) => {
    if (onDelete) {
      onDelete();
    }
    setShowDeleteConfirm(false);
  };

  return {
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
    handleDelete
  };
};