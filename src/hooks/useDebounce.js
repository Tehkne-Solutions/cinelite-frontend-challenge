import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // Configura o timer para atualizar o valor após o delay
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Limpa o timer se o valor mudar antes do delay
        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}

export default useDebounce;