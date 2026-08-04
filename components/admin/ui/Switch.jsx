"use client";

export default function Switch({
  label,
  name,
  checked,
  onChange
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      {label && (
        <span className="text-[10px] font-bold text-gray-400 uppercase">
          {label}
        </span>
      )}

      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="sr-only peer"
      />

      <div className="
        relative w-10 h-5 bg-gray-700 rounded-full
        peer-focus:outline-none
        peer-checked:bg-green-600
        after:content-['']
        after:absolute
        after:top-[2px]
        after:left-[4px]
        after:bg-white
        after:border
        after:border-gray-300
        after:rounded-full
        after:h-4
        after:w-4
        after:transition-all
        peer-checked:after:translate-x-full
        peer-checked:after:border-white
      ">
      </div>
    </label>
  );
}