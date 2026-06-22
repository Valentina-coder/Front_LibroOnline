import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import PropTypes from 'prop-types'

export default function PrivateRoute({ children, roles }) {
  const { isAuthenticated, hasRole } = useAuth()
  const location = useLocation()

  // Verificación 1: ¿está autenticado?
  // Si no, guarda la URL actual en location.state.from para volver después del login.
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Verificación 2: ¿tiene el rol requerido?
  // Si no se pasó roles (o está vacío), omite esta verificación.
  if (roles && roles.length > 0 && !hasRole(roles)) {
    return <Navigate to="/" replace />
  }

  return children
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  roles: PropTypes.arrayOf(PropTypes.string)
}