import {
  CheckCircle2,
  Clock,
  FileEdit,
  AlertTriangle,
  ArrowUp,
  ArrowRight,
  ArrowDown,
  Circle,
} from "lucide-react";

export const statusOptions = [
  { value: "", label: "Todos los estados" },
  { value: "closed", label: "Cerrado" },
  { value: "in_progress", label: "En progreso" },
  { value: "open", label: "Abierto" },
  { value: "waiting_response", label: "Esperando respuesta" },
];

export const priorityOptions = [
  { value: "", label: "Todas las prioridades" },
  { value: "high", label: "Alta" },
  { value: "medium", label: "Media" },
  { value: "low", label: "Baja" },
];

export const getStatusStyle = (status) => {
  switch (status) {
    case "closed":
      return "text-green-700 border-green-800 bg-green-950/30";

    case "in_progress":
      return "text-amber-500 border-amber-500/20 bg-amber-950/30";

    case "open":
      return "text-sky-400 border-sky-500/20 bg-sky-950/30";

    case "waiting_response":
      return "text-violet-400 border-violet-500/20 bg-violet-950/30";

    default:
      return "text-gray-500 border-gray-500/20";
  }
};

export const getStatusIcon = (status) => {
  switch (status) {
    case "closed":
      return <CheckCircle2 size={14} className="mr-1.5" />;

    case "in_progress":
      return <Clock size={14} className="mr-1.5" />;

    case "open":
      return <FileEdit size={14} className="mr-1.5" />;

    case "waiting_response":
      return <AlertTriangle size={14} className="mr-1.5" />;

    default:
      return <Circle size={14} className="mr-1.5" />;
  }
};

export const getPriorityStyle = (priority) => {
  switch (priority) {
    case "high":
      return "text-red-400 border-red-500/20 bg-red-950/30";

    case "medium":
      return "text-amber-400 border-amber-500/20 bg-amber-950/30";

    case "low":
      return "text-green-700 border-green-800 bg-green-950/30";

    default:
      return "text-gray-500 border-gray-500/20";
  }
};

export const getPriorityIcon = (priority) => {
  switch (priority) {
    case "high":
      return <ArrowUp size={14} className="mr-1.5" />;

    case "medium":
      return <ArrowRight size={14} className="mr-1.5" />;

    case "low":
      return <ArrowDown size={14} className="mr-1.5" />;

    default:
      return <Circle size={14} className="mr-1.5" />;
  }
};