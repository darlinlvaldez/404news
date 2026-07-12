import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { fieldClass } from "@/utils/form";
import { ErrorMessage } from "@/components/ErrorMessage";

export default function Input({
  value,
  name,
  type = "text",
  onChange,
  placeholder,
  icon: Icon,
  errors,
  className = "",
  inputClassName = "",
  PasswordToggle = false,
}) {

  const [showPassword, setShowPassword] = useState(false);

  const hasError = !!errors?.[name];

  const inputType = PasswordToggle ? (showPassword ? "text" : "password") : type;

  const styleInput = `w-full bg-gray-950 rounded-xl focus:ring-1 focus:ring-green-800 
  focus:border-transparent outline-none transition py-3.5 text-sm text-gray-100 placeholder:text-gray-500`

  const iconStyles = "absolute inset-y-0 left-4 my-auto text-gray-500 pointer-events-none group-focus-within:text-green-800"
  
  const passwordStyle = `absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-gray-300 transition-colors cursor-pointer`

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <div className="relative w-full group">
        {Icon && (
          <Icon
            className={iconStyles}
            size={18}
          />
        )}

        <input
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={fieldClass(
            hasError,
            `${styleInput}
            ${Icon ? "pl-12 pr-4" : "px-4"}
            ${PasswordToggle ? "pr-12" : "pr-4"}
            ${inputClassName}`
          )}
        />

        {PasswordToggle && (
        <button
          type="button"
          onClick={() => setShowPassword(prev => !prev)}
          className={passwordStyle}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
      </div>

      <ErrorMessage
        errors={errors}
        name={name}
      />
    </div>
  );
}