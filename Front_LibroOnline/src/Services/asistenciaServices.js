// Banco de datos simulado en memoria
let asistenciasSimuladas = [
  { id_asistencia: 101, fecha: "2026-06-22", alumno: "Valentina Cortez", curso: "4to Medio A", presente: true },
  { id_asistencia: 102, fecha: "2026-06-22", alumno: "Juan Pérez", curso: "4to Medio A", presente: false },
  { id_asistencia: 103, fecha: "2026-06-22", alumno: "María Muñoz", curso: "4to Medio A", presente: true }
];

// Obtener registros de asistencia (filtrado opcional por curso)
export const obtenerAsistenciaPorCurso = async (curso) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!curso) resolve([...asistenciasSimuladas]);
      const filtrado = asistenciasSimuladas.filter(a => a.curso.toLowerCase() === curso.toLowerCase());
      resolve(filtrado);
    }, 200);
  });
};

// Registrar o cambiar el estado de asistencia de un alumno
export const registrarAsistencia = async (id_asistencia, estadoPresente) => {
  return new Promise((resolve) => {
    asistenciasSimuladas = asistenciasSimuladas.map(a => 
      a.id_asistencia === id_asistencia ? { ...a, presente: estadoPresente } : a
    );
    resolve({ success: true, message: "Asistencia actualizada" });
  });
};