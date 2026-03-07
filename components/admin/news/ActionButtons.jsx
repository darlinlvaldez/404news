"use client";

import { AlertTriangle } from 'lucide-react';

export const ActionButtons = ({ 
  showDeleteConfirm, 
  onSetShowDeleteConfirm, 
  onSave, 
  onDelete,
  blocksCount = 0
}) => {

  const canDelete = typeof onDelete === "function";

  if (!showDeleteConfirm) {
    return (
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button onClick={onSave} className="w-full sm:flex-1 bg-green-600 hover:bg-green-500 text-white font-black py-5 rounded-3xl">
          Confirmar y Guardar Noticia
        </button>

        {canDelete && (
          <button onClick={() => onSetShowDeleteConfirm(true)} className="w-full sm:w-auto text-red-500 hover:bg-red-500/10 font-bold px-8 py-5 rounded-3xl">
            Eliminar Entrada
          </button>
        )}
      </div>
    );
  }

  if (!canDelete) return null;

  return (
      <div className="bg-red-900/10 border border-red-900/50 p-10 rounded-[2.5rem] flex flex-col items-center animate-in fade-in zoom-in duration-300">
      <div className="bg-red-600 p-4 rounded-full mb-4 shadow-xl shadow-red-900/40">
        <AlertTriangle size={32} className="text-white" />
      </div>
      <h4 className="text-2xl font-black mb-2 text-white">¿Destruir noticia?</h4>
      <p className="text-gray-400 text-sm mb-8 text-center max-w-md">
        Esta acción es irreversible. Se eliminará el registro principal y los {blocksCount} bloques de contenido asociados.
      </p>
      <div className="flex space-x-4 w-full max-w-xs">
        <button 
          onClick={() => onSetShowDeleteConfirm(false)}
          className="flex-1 bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-2xl font-bold transition active:scale-95"
        >
          Cancelar
        </button>
        <button 
          className="flex-1 bg-red-600 hover:bg-red-500 px-6 py-3 rounded-2xl font-bold transition shadow-lg shadow-red-900/40 active:scale-95"
          onClick={onDelete}
        >
          Sí, Eliminar
        </button>
      </div>
    </div>
  );
};