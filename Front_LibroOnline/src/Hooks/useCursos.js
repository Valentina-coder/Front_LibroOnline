// src/hooks/useCursos.js
// =============================================================
// HOOK PERSONALIZADO PARA OBTENER CURSOS — useCursos.js
import { useState, useEffect } from 'react'
import { obtenerCursosDocente, obtenerCursosAlumno } from '../services/gestionCursosService'
import { toast } from 'react-toastify'

export function useCursos(tipo = 'alumno') {
  const [cursos, setCursos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Selecciona la función correcta del microservicio según el perfil escolar
    const fetchFn = tipo === 'docente' ? obtenerCursosDocente : obtenerCursosAlumno

    setLoading(true)
    fetchFn()
      .then(data => {
        // Como estamos usando simulación (Mocks), la data viene directa. 
        // Si después usas Axios real, recordar cambiar a: data.data
        setCursos(data || [])
      })
      .catch(err => {
        setError(err.message || 'Error del servidor')
        toast.error('Error al cargar la lista de asignaturas/cursos')
      })
      .finally(() => setLoading(false))
  }, [tipo]) // Se vuelve a ejecutar limpiamente si el tipo cambia

  // Exponemos setCursos por si el docente necesita archivar, editar 
  // o modificar un curso localmente sin recargar toda la página
  return { cursos, setCursos, loading, error }
}