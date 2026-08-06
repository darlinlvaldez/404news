import clsx from "clsx";

export function fieldClass(
    hasError,
    className = "",
    borderType = "full"
) {
    const borders = {
        full: hasError
            ? "border border-red-500"
            : "border border-gray-700",

        bottom: hasError
            ? "border-b border-b-red-500"
            : "border-b border-b-gray-200",
    };

    return clsx(
        borders[borderType],
        className
    );
}