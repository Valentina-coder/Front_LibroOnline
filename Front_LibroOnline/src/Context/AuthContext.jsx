import { createContext, useState, useCallback } from 'react'
import PropTypes from 'prop-types'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  // Lazy initializer: los parentesis en useState(() => ...) hacen que
  // la función se ejecute solo una vez al montar, no en cada render.
  // Eso es importante porque localStorage.getItem es una operación de I/O.
  const [token, setToken] = useState(() => localStorage.getItem('karma_token'))
  const [usuario, setUsuario] = useState(() => {
    const stored = localStorage.getItem('karma_user')
    return stored ? JSON.parse(stored) : null
  })

  // useCallback: login y logout no se recrean en cada render de AuthProvider.
  // Si se recrearan, todos los componentes que consumen el contexto
  // se re-renderizarían innecesariamente.
  const login = useCallback((newToken, userData) => {
    localStorage.setItem('karma_token', newToken)
    localStorage.setItem('karma_user', JSON.stringify(userData))
    setToken(newToken)
    setUsuario(userData)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('karma_token')
    localStorage.removeItem('karma_user')
    setToken(null)
    setUsuario(null)
  }, [])

  // Doble verificación: solo se considera autenticado si existen
  // TANTO el token como los datos del usuario. Si uno falta, el estado
  // es inconsistente y se trata como no autenticado.
  const isAuthenticated = !!token && !!usuario

  // Acepta string: hasRole('ADMIN')
  // O array:       hasRole(['ADMIN', 'ESPECIALISTA'])
  const hasRole = useCallback((rol) => {
    if (!usuario) return false
    if (Array.isArray(rol)) return rol.includes(usuario.rol)
    return usuario.rol === rol
  }, [usuario])

  return (
    <AuthContext.Provider value={{ token, usuario, login, logout, isAuthenticated, hasRole }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = { children: PropTypes.node.isRequired }