// src/services/usuarioServices.js

// Simulamos una base de datos local temporal en memoria
let usuariosSimulados = [
  { id_usuario: 1, username: "v.cortez", nombre: "Valentina Cortez", rol: "ADMINISTRADOR" },
  { id_usuario: 2, username: "j.perez", nombre: "Juan Pérez", rol: "DIRECTOR" },
  { id_usuario: 3, username: "m.munoz", nombre: "María Muñoz", rol: "DOCENTE" }
];

export const obtenerTodasLosUsuarios = async () => {
  // Simulamos una pequeña demora de red de 300ms para que se vea el efecto de carga
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(usuariosSimulados);
    }, 300);
  });
};

export const eliminarUsuario = async (id_usuario) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      usuariosSimulados = usuariosSimulados.filter(u => u.id_usuario !== id_usuario);
      resolve({ message: "Usuario eliminado correctamente" });
    }, 300);
  });
};