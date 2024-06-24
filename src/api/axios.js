

import axios from 'axios';

// Создание экземпляра axios
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1/',
    withCredentials: true // Чтобы разрешить отправку HTTP-only cookies
});

// Interceptor для добавления токена в заголовки
api.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
});

// Interceptor для обработки ошибок ответа
// api.interceptors.response.use(
//     response => response,
//     async (error) => {
//         const originalRequest = error.config;

//         if (error.response.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;
//             try {
//                 await axios.post('/api/auth/refresh-token');
//                 const accessToken = localStorage.getItem('accessToken');
//                 config.headers['Authorization'] = `Bearer ${accessToken}`;
//                 originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
//                 return api(originalRequest);
//             } catch (error) {
//                 // Логика для обработки ошибки, возможно, выход пользователя из системы
//                 console.error('Ошибка обновления токена', error);
//             }
//         }

//         return Promise.reject(error);
//     }
// );

export default api;
