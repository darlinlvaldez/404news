"use client";

import useDropdown from "@/hooks/useDropdown";

export default function ActionDropdown({ placeholder, value, icon: Icon, 
  options, getIcon, onChange, name,}) {
  const { ref, isOpen, toggle, close } = useDropdown();

  const selected = options.find((option) => option.value === value) ?? options[0];

  const handleSelect = (option) => {
    onChange({
      target: {
        name,
        value: option.value,
      },
    });

    close();
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={toggle}
        className={` bg-gray-900 border border-gray-800  text-gray-300 font-bold
          text-xs px-4 py-2 w-full text-left flex items-center justify-between cursor-pointer
          ${isOpen ? "rounded-b-xl border-green-800" : "rounded-xl"}
        `}
      >
        <span className="flex items-center gap-2">
          {Icon && <Icon className={`w-3.5 h-3.5 
          ${ isOpen
              ? " text-green-700"
              : "text-gray-500"
          }` } />}

          {selected?.label || placeholder}
        </span>

        <span className="text-gray-500"></span>
      </button>

      {isOpen && (
        <div className="absolute bottom-full left-0 w-full
             bg-gray-900 border border-green-800
             border-b-0 rounded-t-xl overflow-hidden shadow-xl z-30"
        >
          {options.map((option) => (
            <button
              type="button"
              key={option.value}
              onClick={() => handleSelect(option)}
              className={`w-full text-left px-4 py-2.5 hover:bg-gray-800 cursor-pointer
                text-xs font-semibold text-gray-300 flex items-center gap-2`}
            >
              {getIcon?.(option.value)}

              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
