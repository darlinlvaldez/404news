import { AlertTriangle } from "lucide-react";

export default function ConfirmModal({
  open,
  title,
  description,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  const modalStyle = `w-[560px] max-w-[90vw] bg-zinc-900 border border-red-900/50 
  p-10 rounded-4xl flex flex-col items-center animate-modal`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className={modalStyle}>
        <div className="bg-red-600 p-4 rounded-full mb-4 shadow-xl shadow-red-900/40">
          <AlertTriangle size={32} className="text-white" />
        </div>

        <h4 className="text-2xl font-black mb-2 text-white">{title}</h4>

        <p className="text-gray-400 text-sm mb-8 text-center">{description}</p>

        <div className="flex space-x-4 w-full max-w-xs">
          <button
            onClick={onCancel}
            className="flex-1 cursor-pointer bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-2xl font-bold"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 cursor-pointer bg-red-600 hover:bg-red-500 px-6 py-3 rounded-2xl font-bold"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
