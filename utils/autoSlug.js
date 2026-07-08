"use client";

import { useEffect, useState } from "react";

const generateSlug = (text) =>
  text
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");

export const useAutoSlug = ({
  source,
  slug,
  setSlug,
  disabled = false,
}) => {
  const [slugEdited, setSlugEdited] = useState(false);

  useEffect(() => {
    if (disabled || slugEdited) return;

    const newSlug = generateSlug(source);

    if (newSlug !== slug) {
      setSlug(newSlug);
    }
  }, [source, slug, disabled, slugEdited, setSlug]);

  const handleSlugChange = (value) => {
    setSlugEdited(value !== "");
    setSlug(value);
  };

  return {
    handleSlugChange,
  };
};