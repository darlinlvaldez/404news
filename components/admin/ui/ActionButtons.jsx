import Link from "next/link";

export function CompactButton({
  icon: Icon,
  onClick,
  title,
  hoverColor = "hover:bg-gray-700",
  className = ""
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`p-2 bg-gray-800 text-gray-400 hover:text-white rounded-xl transition shadow-md cursor-pointer ${hoverColor} ${className}`}
    >
      <Icon size={20} />
    </button>
  );
}

export function ActionButton({
  icon: Icon,
  children,
  href,
  type = "button",
  variant = "green",
  className = "",
  disabled = false,
  ...props
}) {
  const variants = {
    green: "bg-green-700 hover:bg-green-600 text-white",
    blue: "bg-blue-600 hover:bg-blue-500 text-white",
    red: "bg-red-600 hover:bg-red-500 text-white",
    ghostRed: "text-red-500 hover:bg-red-500/10 shadow-none",
  };

  const disabledClasses =
    "bg-gray-600 text-gray-300 cursor-not-allowed shadow-none opacity-70";

  const baseClasses = `
    px-6 py-3 rounded-2xl font-bold inline-flex items-center justify-center transition
    ${disabled ? disabledClasses : `${variants[variant]} cursor-pointer shadow-lg`}
    ${className}
  `;

  if (href) {
    return (
      <Link href={href} className={baseClasses} {...props}>
        {Icon && <Icon size={18} className="mr-2" />}
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={baseClasses}
      {...props}
    >
      {Icon && <Icon size={18} className="mr-2" />}
      {children}
    </button>
  );
}