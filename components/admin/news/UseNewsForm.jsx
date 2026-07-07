"use client";

import { useState, useEffect } from "react";

export const useNewsForm = (initialNews = null, initialBlocks = null) => {

  const [slugEdited, setSlugEdited] = useState(false);

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

  useEffect(() => {
    if (initialNews || slugEdited) return;

    const generatedSlug = newsData.title
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-");

    setNewsData((prev) => {
      if (prev.slug === generatedSlug) {
        return prev;
      }

      return {
        ...prev,
        slug: generatedSlug,
      };
    });
  }, [newsData.title, initialNews, slugEdited]);


  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "slug") {
      setSlugEdited(true);
    }

    if (name === "slug") {
      setSlugEdited(value !== "");
    }

    setNewsData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

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

  const handleSave = async (slug, onSuccess) => {
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

      const response = await fetch(`/api/admin/news/${slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!data.ok) {
        alert(data.message || "Error actualizando noticia");
        return;
      }

      if (onSuccess) onSuccess();

    } catch (error) {
      console.error(error);
      alert("Error guardando cambios");
    }
  };

  const handleDelete = async (slug, onDelete) => {
  try {
    const response = await fetch(`/api/admin/news/${slug}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (!data.ok) {
      alert(data.message);
      return;
    }

    if (onDelete) onDelete();

  } catch (error) {
    console.error(error);
    alert("Error eliminando noticia");
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
    handleDelete,
    setFormData,
  };
};