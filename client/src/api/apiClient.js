import axios from 'axios';

// Create a custom instance of Axios
const apiClient = axios.create({
    // If VITE_API_URL is set (Production), use it. 
    // Otherwise, use an empty string so it hits the same origin (Proxy in development).
    baseURL: import.meta.env.VITE_API_URL || '',
    
    // CRUCIAL: This tells the browser to always send and receive the Session Cookie
    withCredentials: true, 
    
    headers: {
        'Content-Type': 'application/json'
    }
});

export default apiClient;
