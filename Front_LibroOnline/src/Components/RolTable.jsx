import { NavLink } from "react-router-dom";

function Navbar() {
  const obtenerClaseNavLink = ({ isActive }) => {
    return isActive ? "nav-link active fw-bold" : "nav-link";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          LibrOnline
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarLibrOnline"
          aria-controls="navbarLibrOnline"
          aria-expanded="false"
          aria-label="Mostrar navegación"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarAutomotora">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className={obtenerClaseNavLink} to="/" end>
                Inicio
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className={obtenerClaseNavLink} to="/marcas">
                Usuarios
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className={obtenerClaseNavLink} to="/vehiculos">
                Direccion
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;