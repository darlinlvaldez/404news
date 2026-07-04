import clsx from "clsx";

export function inputClass(hasError) {
    return clsx(
        "w-full bg-[#0b0f1a] rounded-2xl pl-12 pr-4 py-4 text-sm transition-all text-white",
        hasError
            ? "border border-red-500 focus:ring-red-500/40"
            : "border border-slate-800 focus:ring-emerald-600/50"
    );
}