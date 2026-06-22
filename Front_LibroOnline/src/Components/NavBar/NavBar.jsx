// BARRA DE NAVEGACIÓN — Navbar.jsx
// =============================================================
// Navbar responsiva adaptada según el rol del usuario logueado
// en el ecosistema digital escolar LibrOnline.
//
// SIEMPRE VISIBLE (pública):
//   Inicio | Nosotros | Proyecto
//
// SIN SESIÓN → botones Login.
//
// CON SESIÓN, links según rol:
//   ALUMNO:         Mis Notas | Mi Asistencia | Eventos
//   DOCENTE:        Registrar Notas | Pasar Asistencia | Anotaciones | Gestión Cursos
//   ADMINISTRADOR /
//   DIRECTOR:       Panel Gestión | Usuarios | Matrículas | Reuniones
//
// Todos los roles ven el nombre del usuario + botón Salir.
// =============================================================
import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { RiMenuLine, RiCloseLine, RiBookOpenLine } from 'react-icons/ri'
import './Navbar.scss'

export default function Navbar() {
  const { isAuthenticated, usuario, logout, hasRole } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
    setMenuOpen(false)
  }

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav className="navbar">
      <div className="navbar__container">
        {/* Cambiado el logo a LibrOnline con ícono de Libro Abierto */}
        <Link to="/" className="navbar__logo" onClick={closeMenu}>
          <RiBookOpenLine className="navbar__logo-icon" />
          <span>LibrOnline</span>
        </Link>

        <button
          className="navbar__burger"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menú"
        >
          {menuOpen ? <RiCloseLine /> : <RiMenuLine />}
        </button>

        <div className={`navbar__menu ${menuOpen ? 'navbar__menu--open' : ''}`}>
          <ul className="navbar__links">
            <li><NavLink to="/" end onClick={closeMenu}>Inicio</NavLink></li>
            <li><NavLink to="/nosotros" onClick={closeMenu}>Nosotros</NavLink></li>
            <li><NavLink to="/proyecto" onClick={closeMenu}>Proyecto</NavLink></li>
          </ul>

          <div className="navbar__auth">
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="navbar__btn navbar__btn--primary" onClick={closeMenu}>
                  Iniciar sesión
                </Link>
              </>
            ) : (
              <>
                {/* VISTA DEL ALUMNO */}
                {hasRole('ALUMNO') && (
                  <>
                    <NavLink to="/mis-notas" className="navbar__user-link" onClick={closeMenu}>Mis Notas</NavLink>
                    <NavLink to="/mi-asistencia" className="navbar__user-link" onClick={closeMenu}>Mi Asistencia</NavLink>
                    <NavLink to="/eventos" className="navbar__user-link" onClick={closeMenu}>Eventos</NavLink>
                  </>
                )}

                {/* VISTA DEL DOCENTE */}
                {hasRole('DOCENTE') && (
                  <>
                    <NavLink to="/gestion-cursos" className="navbar__user-link" onClick={closeMenu}>Mis Cursos</NavLink>
                    <NavLink to="/registrar-asistencia" className="navbar__user-link" onClick={closeMenu}>Asistencia</NavLink>
                    <NavLink to="/registrar-notas" className="navbar__user-link" onClick={closeMenu}>Notas</NavLink>
                    <NavLink to="/anotaciones" className="navbar__user-link" onClick={closeMenu}>Anotaciones</NavLink>
                  </>
                )}

                {/* VISTA DEL ADMINISTRADOR O DIRECTOR */}
                {(hasRole('ADMIN') || hasRole('DIRECTOR') || hasRole('ADMINISTRADOR')) && (
                  <>
                    <NavLink to="/usuarios" className="navbar__user-link" onClick={closeMenu}>Usuarios</NavLink>
                    <NavLink to="/matriculas" className="navbar__user-link" onClick={closeMenu}>Matrículas</NavLink>
                    <NavLink to="/gestion-reuniones" className="navbar__user-link" onClick={closeMenu}>Reuniones</NavLink>
                    <NavLink to="/dashboard-admin" className="navbar__user-link" onClick={closeMenu}>Panel Gestión</NavLink>
                  </>
                )}

                {/* ENLACE AL PERFIL DEL USUARIO ACTIVO */}
                <NavLink
                  to="/mi-perfil"
                  className="navbar__user-link"
                  onClick={closeMenu}
                >
                  👤 {usuario?.nombre || usuario?.username || 'Usuario'}
                </NavLink>

                <button className="navbar__btn navbar__btn--outline navbar__btn--sm" onClick={handleLogout}>
                  Salir
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}