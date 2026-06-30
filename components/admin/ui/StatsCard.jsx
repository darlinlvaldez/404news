export default function StatsCard({
  title,
  value,
  icon: Icon,
  color = "text-white",
  subtitle = ""
}) {
  return (
    <div className="bg-gray-900 p-5 rounded-xl border border-gray-700 shadow-lg hover:border-gray-600 transition">
      <div className="flex justify-between items-start">
        <p className="text-gray-400 text-xs uppercase font-bold tracking-wider">
          {title}
        </p>

        {Icon && <Icon className={`w-5 h-5 ${color}`} />}
      </div>

      <h3 className={`text-3xl font-bold mt-2 ${color}`}>
        {value}
      </h3>

      {subtitle && (
        <p className="text-xs text-gray-500 mt-2">
          {subtitle}
        </p>
      )}
    </div>
  );
}