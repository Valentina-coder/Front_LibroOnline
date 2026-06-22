import axios from "axios";


const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json"
    }
});
// Interceptor de REQUEST: adjunta el token JWT en cada petición automáticamente.
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('karma_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Interceptor de RESPONSE: si el token expiró (401), limpia la sesión y redirige.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('karma_token')
      localStorage.removeItem('karma_user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api;