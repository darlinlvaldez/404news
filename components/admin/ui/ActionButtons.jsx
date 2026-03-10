export function ActionButton({
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

export function SaveButton({
  icon: Icon,
  children,
  type = "button",
  variant = "green",
  className = "",
  ...props
}) {

  const variants = {
    green: "bg-green-600 hover:bg-green-500",
    blue: "bg-blue-600 hover:bg-blue-500",
  };

  return (
    <button
      type={type}
      className={`px-6 py-3 rounded-xl font-bold flex items-center transition cursor-pointer shadow-lg ${variants[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon size={18} className="mr-2" />}
      {children}
    </button>
  );
}