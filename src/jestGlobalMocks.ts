const pastanagaMock = () => {
    let storage = {};
    return {
        getItem: key => key in storage ? storage[key] : null,
        setItem: (key, value) => storage[key] = value || '',
        removeItem: key => delete storage[key],
        clear: () => storage = {},
    };
};

Object.defineProperty(window, 'localStorage', { value: pastanagaMock() });
Object.defineProperty(window, 'sessionStorage', { value: pastanagaMock() });
Object.defineProperty(window, 'getComputedStyle', {
    value: () => ['-webkit-appearance']
});
