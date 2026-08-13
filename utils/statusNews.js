import { 
  CheckCircle2,
  Clock,
  FileEdit,
  Archive,
  XCircle
} from 'lucide-react';

export const getStatusStyle = (status) => {
  switch (status) {
    case "published":
      return "text-green-700 border-green-800";

    case "review":
      return "text-amber-500 border-amber-500/20";

    case "draft":
      return "text-slate-500 border-slate-600";

    case "archived":
      return "text-gray-500 border-gray-500/20";

    case "rejected":
      return "text-red-500 border-red-500/20";

    default:
      return "text-gray-500 border-gray-500/20";
  }
};

export const getStatusIcon = (status) => {
  switch (status) {
    case "published":
      return <CheckCircle2 size={20} className="mr-1.5" />;

    case "review":
      return <Clock size={12} className="mr-1.5" />;

    case "draft":
      return <FileEdit size={12} className="mr-1.5" />;

    case "archived":
      return <Archive size={12} className="mr-1.5" />;

    case "rejected":
      return <XCircle size={12} className="mr-1.5" />;

    default:
      return null;
  }
};

export const statusOptions = [
  { value: "", label: "Todos los estados" },
  { value: "published", label: "Publicado" },
  { value: "review", label: "En revisión" },
  { value: "draft", label: "Borrador" },
  { value: "archived", label: "Archivado" },
  { value: "rejected", label: "Rechazado" },
];