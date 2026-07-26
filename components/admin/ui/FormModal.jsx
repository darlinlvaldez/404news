"use client";

import { X } from "lucide-react";

export default function FormModal({
  open,
  title,
  onClose,
  onSubmit,
  children,
  submitText = "Guardar",
  cancelText = "Cancelar",
  loading = false,
  width = "max-w-lg",
  topContent = null,
  bottomContent = null,
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <form
        onSubmit={onSubmit}
        onClick={(e) => e.stopPropagation()}
        className={`w-full ${width} bg-gray-900 rounded-2xl border border-gray-700 overflow-hidden`}
      >
        <header className="flex justify-between items-center p-5 border-b border-gray-700">
          <h2 className="text-lg font-bold">
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg"
          >
            <X size={18} />
          </button>
        </header>

        <div className="p-5 space-y-5">

          {topContent}

          {children}

          {bottomContent}

        </div>

        <footer className="border-t border-gray-700 p-5 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-gray-700"
          >
            {cancelText}
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 rounded-lg bg-green-700 hover:bg-green-600 disabled:opacity-50"
          >
            {loading ? "Enviando..." : submitText}
          </button>
        </footer>
      </form>
    </div>
  );
}