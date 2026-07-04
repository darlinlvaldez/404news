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

    function handleResponse(data) {

        if (data.errors) {
            setErrors(data.errors);
        } else {
            setError(data.error);
        }

    }

    return {
        error,
        errors,
        setError,
        setErrors,
        clearField,
        handleResponse
    };

}