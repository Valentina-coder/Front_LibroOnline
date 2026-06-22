import api from "./axiosConfig";

export const obtenerTodasLasComunas = async () => {
    try {
        const respuesta = await api.get("/comuna");
        return respuesta.data;
    } catch (error){
        console.error("Error al obtener todas las comunas: ", error);
        throw error;
    }
    
};

export const obtenerComunaPorId = async (id_comuna) => {
    try{
        const idComunaNumerico = parseInt(id_comuna);
        const respuesta = await api.get(`/comuna/${idComunaNumerico}`);
        return respuesta.data
    } catch (error){
        console.error("Error al obtener la comuna :", error);
        throw error;
    }
};

export const agregarComuna = async (nuevaComuna) => {
  try {
    const datos_comuna ={
        nombre_comuna: nuevaComuna.nombre_comuna,
        id_ciudad: parseInt(nuevaComuna.id_ciudad)
    };

    const respuesta = await api.post("/comuna", datos_comuna);
    return respuesta.data;
  } catch (error) {
    console.error("Error al agregar la comuna:", error);
    throw error;
  }
};

export const actualizarComuna = async (ComunaActualizada) => {
  try {
    const datos_comuna = {
      id_comuna: parseInt(ComunaActualizada.id_comuna),
      nombre_comuna: ComunaActualizada.nombre_comuna,
      id_ciudad: parseInt(ComunaActualizada.id_ciudad)
    };

    const respuesta = await api.put("/comuna", datos_comuna);
    return respuesta.data;
  } catch (error) {
    console.error("Error al actualizar la comuna:", error);
    throw error;
  }
};

export const eliminarComuna = async (id_comuna) => {
    try {
        const idComunaNumerico = parseInt(id_comuna);

        const respuesta = await api.delete(`/comuna/${idComunaNumerico}`);
        return respuesta.data;
    } catch (error) {
        console.error("error al eliminar al comuna: ", error)
        throw error;
    }
};