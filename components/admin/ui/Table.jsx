export function Container({ children }) {
  return (
  <div className="bg-gray-900 rounded-4xl border border-gray-700 overflow-hidden shadow-2xl">
    <div className="overflow-x-auto">
      <table className="min-w-250 w-full text-left border-collapse">
        {children}
      </table>
    </div>
  </div>
  );
}

export function Th({ children, className = "" }) {
  return (
    <th className={`px-8 py-6 text-ls uppercase tracking-tight ${className}`}>
      {children}
    </th>
  );
}