"use client";

import { useEffect, useRef, useState } from "react";

export default function Select({ options, value, onChange, className }) {

  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);
  
  const selected = options.find(opt => opt.value === value);

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
        onClick={() => setIsOpen(prev => !prev)}
        className={`bg-gray-950 border border-gray-700 px-5 py-3.5 font-bold
        focus:outline-none focus:border-green-800 cursor-pointer w-full text-left
        ${isOpen ? "rounded-t-2xl border-green-800" : "rounded-2xl"}`}>
        <span className="text-slate-400">
          {selected?.label}
        </span>
      </button>

      {isOpen && (
        <ul className="absolute w-full bg-[#0b0f1a] border border-green-800 border-t-0 rounded-b-2xl overflow-hidden z-10">
          {options.map((option) => (
            <li key={option.value}
              onMouseDown={() => {
                onChange(option.value);
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