"use client";

import { Save } from "lucide-react";

export const ActionButtons = ({
  onSave,
  onDelete,
}) => {
  const canDelete = typeof onDelete === "function";

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <button
        onClick={onSave}
        className="w-full sm:flex-1 cursor-pointer bg-green-700 hover:bg-green-600 text-white font-black py-5 rounded-3xl flex items-center justify-center"
      >
        <Save size={18} className="mr-2" />
        Confirmar y Guardar Noticia
      </button>

      {canDelete && (
        <button
          onClick={onDelete}
          className="w-full sm:w-auto cursor-pointer text-red-500 hover:bg-red-500/10 font-bold px-8 py-5 rounded-3xl"
        >
          Eliminar Entrada
        </button>
      )}
    </div>
  );
};