// =============================================================
// SERVICIO DE AUTENTICACIÓN — authService.js
// =============================================================
// Tres endpoints para el flujo de ingreso y registro:
//   - login(data)                → POST /auth/login
//   - register(data)             → POST /auth/register            (paciente)
//   - registerEspecialista(data) → POST /auth/register/especialista
import api from './axiosConfig'

export const login = (data) => api.post('/auth/login', data)
export const register = (data) => api.post('/auth/register', data)
export const registerEspecialista = (data) => api.post('/auth/register/especialista', data)
