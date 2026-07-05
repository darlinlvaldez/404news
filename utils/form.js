import clsx from "clsx";

export function fieldClass(hasError, className = "") {
    return clsx(
        hasError
            ? "border border-red-500"
            : "border border-gray-700",
        className
    );
}