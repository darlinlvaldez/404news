export function ErrorMessage({ errors, name, error }) {
    const message = name
        ? errors?.[name]
        : error;

    if (!message) return null;

    return (
        <p className="text-red-400 text-xs mt-2">
            {message}
        </p>
    );
}