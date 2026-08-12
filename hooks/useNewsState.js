"use client";

import { useState } from "react";
import { useAutoSlug } from '@/utils/autoSlug';

export const useNewsState = (initialNews = null, initialBlocks = null) => {

  const [newsData, setNewsData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    cover_image: "",
    author_id: null,
    category_id: "",
    status: "draft",
    ...initialNews
  });

  const [blocks, setBlocks] = useState(
    initialBlocks || [
      { id: 1, block_type: "heading", content: "", position: 1 },
      { id: 2, block_type: "paragraph", content: "", position: 2 }
    ]
  );

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "slug") {
      handleSlugChange(value);
      return;
    }

    setNewsData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    }));
  };

  const { handleSlugChange } = useAutoSlug({
    source: newsData.title,
    slug: newsData.slug,
    setSlug: (slug) =>
      setNewsData((prev) => ({
        ...prev,
        slug,
      })),
    disabled: !!initialNews,
  });

  const addBlock = (type) => {
    const newBlock = {
      id: Date.now(),
      block_type: type,
      content: "",
      image_url: "",
      alt_text: "",
      position: blocks.length + 1
    };
    setBlocks([...blocks, newBlock]);
  };

  const removeBlock = (id) => {
    const filtered = blocks.filter(b => b.id !== id);
    const reordered = filtered.map((b, index) => ({
      ...b,
      position: index + 1
    }));
    setBlocks(reordered);
  };

  const updateBlock = (id, field, value) => {
    setBlocks(blocks.map(b =>
      b.id === id ? { ...b, [field]: value } : b
    ));
  };

  const moveBlock = (index, direction) => {
    const newBlocks = [...blocks];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newBlocks.length) return;

    [newBlocks[index], newBlocks[targetIndex]] =
      [newBlocks[targetIndex], newBlocks[index]];

    const updatedPositions = newBlocks.map((b, idx) => ({
      ...b,
      position: idx + 1
    }));

    setBlocks(updatedPositions);
  };

  const setFormData = (news, blocksFromApi) => {
    if (news) {
      setNewsData({
        title: news.title,
        slug: news.slug,
        excerpt: news.excerpt,
        cover_image: news.cover_image,
        author_id: news.author_id,
        category_id: news.category_id,
        status: news.status,
      });
    }

    if (blocksFromApi) {
      setBlocks(blocksFromApi);
    }
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
    setFormData,
  };
};