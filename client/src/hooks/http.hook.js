import {useState, useCallback} from 'react';

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const request = useCallback(async (url, method = 'GET', body =null, headers = {}) => {
        setLoading(true);
        try{
            // если body есть, то приводим его к json-строке
            if (body) {
                body = JSON.stringify(body);
                headers['Content-Type'] = 'application/json';
            }

            const response = await fetch(url, {method, body, headers});
            const data = await response.json();

            if(!response.ok) {
                throw new Error(data.message, 'ОШИБКА!' || 'При запросе что-то пошло не так (http.hook)');
            }

            setLoading(false);
            return data;

        } catch (e) {
            //console.log('Error http.hook:', e.message);
            setLoading(false);
            setError(e.message);
            throw e;
        }
    }, []); // набор зависимостей

    // функция, чистящая ошибки
    // const clearError = () => setError(null);
    const clearError = useCallback(() => setError(null), [])

    return {loading, request, error, clearError};
}