"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordToggle({
  children,
  className = "absolute inset-y-0 right-4 flex items-center text-slate-600 hover:text-slate-400 transition-colors cursor-pointer"
}) {
  const [show, setShow] = useState(false);

  return (
    <>
      {children(show)}

      <button
        type="button"
        onClick={() => setShow(prev => !prev)}
        className={className}
      >
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </>
  );
}