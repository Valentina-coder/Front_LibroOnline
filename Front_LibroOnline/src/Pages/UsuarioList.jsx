import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { obtenerTodasLosUsuarios, eliminarUsuario } from "../services/usuarioServices";
// Cambiamos el alias de importación para que sea semántico
import UsuarioTable from "../components/UsuarioTable";

import {
  obtenerTodasLosUsuarios,
  eliminarUsuario
} from "../services/usuarioServices";

function UsuarioListPage() {
  const navigate = useNavigate();
  const MAX_FILTRO_ID = 10;
  const MAX_FILTRO_NOMBRE_USUARIO = 50;

  const [usuarios, setUsuarios] = useState([]);
  const [filtroId, setFiltroId] = useState("");
  const [filtroNombre, setFiltroNombre] = useState("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  const cargarUsuarios = async () => {
    try {
      setCargando(true);
      setError("");
      setMensaje("");

      const datos = await obtenerTodasLosUsuarios();

      if (Array.isArray(datos)) {
        setUsuarios(datos);
      } else {
        setUsuarios([]);
        setError("El backend respondió, pero no devolvió una lista válida de usuarios.");
      }
    } catch (errorPeticion) {
      console.error("Error al cargar usuarios:", errorPeticion);
      setUsuarios([]);
      setError("No se pudieron cargar los usuarios desde el backend.");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const manejarCambioFiltroId = (evento) => {
    const valor = evento.target.value;
    const soloNumeros = valor.replace(/\D/g, "");

    if (soloNumeros.length <= MAX_FILTRO_ID) {
      setFiltroId(soloNumeros);
    }
  };

  const manejarCambioFiltroNombre = (evento) => {
    const valor = evento.target.value;

    if (valor.length <= MAX_FILTRO_NOMBRE_USUARIO) {
      setFiltroNombre(valor);
    }
  };

  const textoFiltroId = filtroId.trim();
  const textoFiltroNombre = filtroNombre.trim().toLowerCase();

  const usuariosFiltrados = usuarios.filter((usuario) => {
    const coincideId =
      textoFiltroId === ""
        ? true
        : usuario.id_usuario?.toString().includes(textoFiltroId);

    const nombreParaFiltrar = usuario.username || usuario.nombre || "";
    const coincideNombre =
      textoFiltroNombre === ""
        ? true
        : nombreParaFiltrar.toLowerCase().includes(textoFiltroNombre);

    return coincideId && coincideNombre;
  });

  const manejarAgregarUsuario = () => {
    navigate("/usuarios/agregar");
  };

  const manejarEditarUsuario = (id_usuario) => {
    navigate(`/usuarios/editar/${id_usuario}`);
  };

  const manejarEliminarUsuario = async (id_usuario) => {
    const confirmar = window.confirm(
      `¿Estás seguro de que deseas eliminar al usuario con ID ${id_usuario}?`
    );

    if (!confirmar) {
      return;
    }

    try {
      setError("");
      setMensaje("");

      await eliminarUsuario(id_usuario);
      setMensaje("Usuario eliminado correctamente.");
      await cargarUsuarios(); // Recarga la lista actualizada de la BD
    } catch (errorPeticion) {
      console.error("Error al eliminar usuario:", errorPeticion);

      const mensajeBackend =
        errorPeticion.response?.data?.message ||
        errorPeticion.response?.data?.error ||
        "";

      setError(
        mensajeBackend !== ""
          ? `No se pudo eliminar al usuario. ${mensajeBackend}`
          : "No se pudo eliminar al usuario. Comprueba si posee registros históricos o dependencias activas."
      );
    }
  };

  const limpiarFiltros = () => {
    setFiltroId("");
    setFiltroNombre("");
  };

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <div>
          <h2 className="mb-0">Gestión de Usuarios</h2>
          <small className="text-muted">
            Listar, filtrar, editar y eliminar usuarios de LibrOnline (Directivos, Docentes, Alumnos).
          </small>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={manejarAgregarUsuario}
        >
          Agregar usuario
        </button>
      </div>

      <div className="card-body">
        {mensaje !== "" && <div className="alert alert-success">{mensaje}</div>}
        {error !== "" && <div className="alert alert-danger">{error}</div>}

        <div className="row mb-3">
          <div className="col-md-3">
            <label htmlFor="filtroIdUsuario" className="form-label">
              Filtrar por ID
            </label>

            <input
              id="filtroIdUsuario"
              type="text"
              inputMode="numeric"
              className="form-control"
              placeholder="Ejemplo: 1"
              value={filtroId}
              onChange={manejarCambioFiltroId}
              maxLength={MAX_FILTRO_ID}
            />

            <div className="form-text">
              {filtroId.length}/{MAX_FILTRO_ID} caracteres
            </div>
          </div>

          <div className="col-md-5">
            <label htmlFor="filtroNombreUsuario" className="form-label">
              Filtrar por Nombre o Username
            </label>

            <input
              id="filtroNombreUsuario"
              type="text"
              className="form-control"
              placeholder="Ejemplo: v.cortez"
              value={filtroNombre}
              onChange={manejarCambioFiltroNombre}
              maxLength={MAX_FILTRO_NAME_USUARIO}
            />

            <div className="form-text">
              {filtroNombre.length}/{MAX_FILTRO_NOMBRE_USUARIO} caracteres
            </div>
          </div>

          <div className="col-md-2 d-flex align-items-end">
            <button
              type="button"
              className="btn btn-secondary w-100"
              onClick={limpiarFiltros}
            >
              Limpiar
            </button>
          </div>

          <div className="col-md-2 d-flex align-items-end">
            <button
              type="button"
              className="btn btn-dark w-100"
              onClick={cargarUsuarios}
            >
              Recargar
            </button>
          </div>
        </div>

        {cargando ? (
          <div className="alert alert-info mb-0">
            Cargando usuarios desde el backend...
          </div>
        ) : (
          <UsuarioTable
            usuarios={usuariosFiltrados}
            onEditar={manejarEditarUsuario}
            onEliminar={manejarEliminarUsuario}
          />
        )}
      </div>
    </div>
  );
}

export default UsuarioListPage;