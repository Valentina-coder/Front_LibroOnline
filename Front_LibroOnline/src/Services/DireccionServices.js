import api from "./axiosConfig";

export const obtenerTodasLasDirecciones = async () => {
    try {
        const respuesta = await api.get("/direccion");
        return respuesta.data;
    } catch (error){
        console.error("Error al obtener todas las direcciones: ", error);
        throw error;
    }
    
};

export const obtenerDireccionesPorId = async (id_direccion ) => {
    try{
        const idDireccionNumerico = parseInt(id_direccion);
        const respuesta = await api.get(`/direccion/${idDireccionNumerico}`);
        return respuesta.data
    } catch (error){
        console.error("Error al obtener la direccion :", error);
        throw error;
    }
};

export const agregarDireccion = async (nuevaDireccion) => {
  try {
    const datos_direccion ={
        calle: nuevaDireccion.calle,
        numero: parseInt(nuevaDireccion.numero),
        id_usuarios: parseInt(nuevaDireccion.id_usuarios),
        id_comuna: parseInt(nuevaDireccion.id_comuna)
    };

    const respuesta = await api.post("/direccion", datos_direccion);
    return respuesta.data;
  } catch (error) {
    console.error("Error al agregar la direccion:", error);
    throw error;
  }
};

export const actualizarDireccion = async (DireccionActualizada) => {
  try {
    const datos_direccion = {
        id_direccion: parseInt(DireccionActualizada.id_direccion),
        calle: DireccionActualizada.calle,
        numero: parseInt(DireccionActualizada.numero),
        id_usuarios: parseInt(DireccionActualizada.id_usuarios),
        id_comuna: parseInt(DireccionActualizada.id_comuna)
    };

    const respuesta = await api.put("/direccion", datos_direccion);
    return respuesta.data;
  } catch (error) {
    console.error("Error al actualizar la direccion:", error);
    throw error;
  }
};

export const eliminarDireccion = async (id_direccion) => {
    try {
        const idDireccionNumerico = parseInt(id_direccion);

        const respuesta = await api.delete(`/direccion/${idDireccionNumerico}`);
        return respuesta.data;
    } catch (error) {
        console.error("error al eliminar la direccion: ", error)
        throw error;
    }
};