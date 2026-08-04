"use client";

import { ChevronDown, File, Paperclip, X } from "lucide-react";
import useDropdown from "@/hooks/useDropdown";

export default function AttachmentDropdown({ files, onRemove }) {
  const { ref, isOpen, toggle } = useDropdown();

  if (!files.length) return null;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={toggle}
        className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[11px] font-semibold transition cursor-pointer
            ${
                isOpen
                ? "border-green-700 bg-gray-900 text-white"
                : "border-gray-800 bg-gray-900 text-gray-400 hover:text-white hover:border-gray-700"
            }
        `}
      >
        <Paperclip className="w-3.5 h-3.5" />

        {files.length}

        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 bottom-full mb-2 w-72 rounded-xl border border-gray-800 bg-gray-900 shadow-xl overflow-hidden z-40"
        >
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-2 px-3 py-2 border-b border-gray-800 last:border-0"
            >
              <div className="flex items-center gap-2 min-w-0">
                <File className="w-4 h-4 text-gray-500 shrink-0" />

                <span className="truncate text-xs text-gray-300">
                  {file.name}
                </span>
              </div>

              <button
                type="button"
                onClick={() => onRemove(index)}
                className="text-gray-500 hover:text-red-400 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
