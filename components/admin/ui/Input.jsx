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

  const styleInput = `w-full bg-gray-950 rounded-xl focus:ring-1 focus:ring-green-800 
  focus:border-transparent outline-none transition py-3.5 text-sm text-gray-100 placeholder:text-gray-500`

  const styleIcon = "absolute inset-y-0 left-4 my-auto text-gray-500 pointer-events-none group-focus-within:text-green-800"
  
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <div className="relative w-full group">
        {Icon && (
          <Icon
            className={styleIcon}
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
            `${styleInput}
            ${Icon ? "pl-12 pr-4" : "px-4"}
            ${inputClassName}`
          )}
        />
      </div>

      <ErrorMessage
        errors={errors}
        name={name}
      />
    </div>
  );
}