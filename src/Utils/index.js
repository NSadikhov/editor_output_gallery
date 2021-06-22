import React, { useEffect, useState } from 'react';

export const usePersistedStateLocal = (key, value) => {
    const [state, setState] = useState(JSON.parse(localStorage.getItem(key)) ?? value);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state))
    }, [key, state])

    return [state, setState];
}