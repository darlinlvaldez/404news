"use client";

import { useEffect, useRef, useState } from "react";
import { fieldClass } from "@/utils/form";
import { ErrorMessage } from "@/components/ErrorMessage";

export default function Select({ options, value, onChange, onOpen, name, className, placeholder, errors }) {

  const hasError = !!errors?.[name];
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);
  
  const selected = options.find(opt => String(opt.value) === String(value)); 

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={selectRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => {
          setIsOpen(prev => !prev);

          if (!isOpen && onOpen && name) {
            onOpen(name);
          }
        }}
        className={fieldClass(hasError,
          `bg-gray-950 px-5 py-3.5 font-bold w-full text-left cursor-pointer focus:outline-none ${
            isOpen
              ? "rounded-t-2xl border-green-800"
              : "rounded-2xl"
          }`
        )}
        >
        <span className={selected ? "text-white" : "text-gray-600"}>
          {selected?.label || placeholder}
        </span>
      </button>

      <ErrorMessage
        errors={errors}
        name={name}
      />

      {isOpen && (
        <ul className="absolute w-full bg-[#0b0f1a] border border-green-800 border-t-0 rounded-b-2xl overflow-hidden z-10">
          {options.map((option) => (
            <li key={option.value}
              onMouseDown={() => {
                if (name) {
                  onChange({
                    target: {
                      name,
                      value: option.value,
                    },
                  });
                } else {
                  onChange(option.value);
                }

                setIsOpen(false);
              }}
              className="px-5 py-3 text-xs hover:bg-gray-800 cursor-pointer text-gray-400">
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}