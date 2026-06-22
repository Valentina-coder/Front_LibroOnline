import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export function useAuth() {
  const context = useContext(AuthContext)
  // Si alguien usa useAuth() fuera de AuthProvider, este error
  // explica exactamente qué pasó en vez de un crash sin mensaje.
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider')
  }
  return context
}