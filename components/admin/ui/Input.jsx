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
}) {
  const hasError = !!errors?.[name];

  return (
    <div className={`relative ${className}`}>
      {Icon && (
        <Icon
          className="absolute inset-y-0 left-4 my-auto text-gray-500 pointer-events-none"
          size={18}
        />
      )}

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={fieldClass(
          hasError,
          `w-full bg-gray-950 rounded-2xl
          py-3.5 text-sm text-gray-100 placeholder:text-gray-500
          ${Icon ? "pl-12 pr-4" : "px-4"}
          ${inputClassName}`
        )}
      />

      <ErrorMessage
        errors={errors}
        name={name}
      />
    </div>
  );
}