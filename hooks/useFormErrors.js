import { useState } from "react";

export function useFormErrors() {

    const [error, setError] = useState("");
    const [errors, setErrors] = useState({});

    function clearField(name) {
        setErrors(prev => ({
            ...prev,
            [name]: undefined
        }));

        setError("");
    }

    function clearErrors() {
        setErrors({});
        setError("");
    }

    function normalizeErrors(errors) {
        return Object.fromEntries(
            Object.entries(errors).map(([key, value]) => [
                key,
                Array.isArray(value) ? value[0] : value
            ])
        );
    }

    function handleResponse(data) {

        if (data.errors) {
            setErrors(normalizeErrors(data.errors));
        } else {
            setError(data.error);
        }

    }

    function handleZodError(error) {
        console.log(error.issues);

        const fieldErrors = {};

        error.issues.forEach((issue) => {
            const field = issue.path[0];

            fieldErrors[field ?? "general"] = issue.message;
        });

        setErrors(fieldErrors);
    }

    return {
        error,
        errors,
        setError,
        setErrors,
        clearField,
        clearErrors,
        handleResponse,
        handleZodError
    };
}