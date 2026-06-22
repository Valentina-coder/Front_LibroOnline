import api from "./axiosConfig";

export const obtenerTodosLosRoles = async () => {
    try {
        const respuesta = await api.get("/rol");
        return respuesta.data;
    } catch (error){
        console.error("Error al obtener todos los roles: ", error);
        throw error;
    }
    
};

export const obtenerRolPorId = async (id_rol) => {
    try{
        const idRolNumerico = parseInt(id_rol);
        const respuesta = await api.get(`/rol/${idRolNumerico}`);
        return respuesta.data
    } catch (error){
        console.error("Error al obtener el rol :", error);
        throw error;
    }
};

export const agregarRol = async (nuevaRol) => {
  try {
    const datos_rol = {
        tipo_rol: nuevaRol.tipo_rol,
        id_usuarios: parseInt(nuevaRol.id_usuario)
    }
    const respuesta = await api.post("/rol", nuevaRol);
    return respuesta.data;
  } catch (error) {
    console.error("Error al agregar el rol:", error);
    throw error;
  }
};

export const actualizarRol = async (RolActualizada) => {
  try {
    const datos_rol = {
      id_email: parseInt(RolActualizada.id_rol),
      tipo_rol: RolActualizada.tipo_rol,
      id_usuario: parseInt(RolActualizada.id_usuario)
    };

    const respuesta = await api.put("/rol", datos_rol);
    return respuesta.data;
  } catch (error) {
    console.error("Error al actualizar el rol:", error);
    throw error;
  }
};

export const eliminarEmail = async (id_email) => {
    try {
        const idRolNumerico = parseInt(id_email);
        const respuesta = await api.delete(`/rol/${idRolNumerico}`);
        return respuesta.data;
    } catch (error) {
        console.error("error al eliminar el rol: ", error)
        throw error;
    }
};