import api from "./axiosConfig";

export const obtenerTodosLosEmail = async () => {
    try {
        const respuesta = await api.get("/ciudad");
        return respuesta.data;
    } catch (error){
        console.error("Error al obtener todas las ciudades: ", error);
        throw error;
    }
    
};

export const obtenerCiudadPorId = async (id_ciudad) => {
    try{
        const idCiudadNumerico = parseInt(id_ciudad);
        const respuesta = await api.get(`/ciudad/${idCiudadNumerico}`);
        return respuesta.data
    } catch (error){
        console.error("Error al obtener la ciudad :", error);
        throw error;
    }
};

export const agregarCiudad = async (nuevaCiudad) => {
  try {
    const datos_ciudad ={
        nombre_ciudad: nuevaCiudad.nombre_ciudad,
        id_region: parseInt(nuevaCiudad.id_region)
    };


    const respuesta = await api.post("/ciudad", datos_ciudad);
    return respuesta.data;
  } catch (error) {
    console.error("Error al agregar la ciudad:", error);
    throw error;
  }
};

export const actualizarCiudad = async (CiudadActualizada) => {
  try {
    const datos_ciudad = {
      id_ciudad: parseInt(CiudadActualizada.id_ciudad),
      nombre_ciudad: CiudadActualizada.nombre_ciudad,
      id_region: parseInt(CiudadActualizada.id_region)
    };

    const respuesta = await api.put("/ciudad", datos_ciudad);
    return respuesta.data;
  } catch (error) {
    console.error("Error al actualizar la ciudad:", error);
    throw error;
  }
};

export const eliminarCiudad = async (id_ciudad) => {
    try {
        const idCiudadNumerico = parseInt(id_ciudad);

        const respuesta = await api.delete(`/ciudad/${idCiudadNumerico}`);
        return respuesta.data;
    } catch (error) {
        console.error("error al eliminar al ciudad: ", error)
        throw error;
    }
};