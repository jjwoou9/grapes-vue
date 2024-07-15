// src/utils/fetcher.ts
const apiUrl = import.meta.env.VITE_APP_API_URL

export const fetcher = async (endpoint: string, options: RequestInit) => {
    const url = `${apiUrl}${endpoint}`
    const response = await fetch(url, options)
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    return response.json()
}


export const postFetcher = async (endpoint: string, body: object) => {
    return fetcher(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
};
