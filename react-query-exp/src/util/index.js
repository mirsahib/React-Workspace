function debounce(func, delay) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        return new Promise((resolve, reject) => {
            timer = setTimeout(async () => {
                try {
                    const result = await func(...args);
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            }, delay);
        });
    };
}
export { debounce };