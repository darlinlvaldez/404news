"use client";

import { fieldClass } from "@/utils/form";
import { ErrorMessage } from "@/components/ErrorMessage";
import useDropdown from "@/hooks/useDropdown";

export default function Select({
  options,
  value,
  onChange,
  onOpen,
  name,
  className,
  placeholder,
  errors,
  icon: Icon
}) {

  const hasError = !!errors?.[name];

  const { ref, isOpen, toggle, close } = useDropdown();

  const selected = options.find(opt => String(opt.value) === String(value));

  const iconStyles = `absolute right-4 top-3.5 pointer-events-none transition-colors
    ${isOpen ? "text-green-800" : "text-gray-500"}`;

  return (
    <div ref={ref} className={`relative group ${className}`}>

      <button type="button"
        onClick={() => {toggle();

          if (!isOpen && onOpen && name) {
            onOpen(name);
          }
        }}
        className={fieldClass(
          hasError,
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

      {Icon && (
        <Icon
          className={iconStyles}
          size={20}
        />
      )}

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

                close();
              }}
              className="px-5 py-3 text-xs hover:bg-gray-800 cursor-pointer text-gray-400"
            >
              {option.label}
            </li>
          ))}

        </ul>
      )}

    </div>
  );
}