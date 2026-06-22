import api from "./axiosConfig";

export const obtenerTodasLasRegiones = async () => {
    try {
        const respuesta = await api.get("/region");
        return respuesta.data;
    } catch (error){
        console.error("Error al obtener todos las regiones: ", error);
        throw error;
    }
    
};

export const obtenerRegionPorId = async (id_region) => {
    try{
        const idRegionNumerico = parseInt(id_region);
        const respuesta = await api.get(`/region/${idRegionNumerico}`);
        return respuesta.data
    } catch (error){
        console.error("Error al obtener las regiones :", error);
        throw error;
    }
};

export const agregarRegion = async (nuevaRegion) => {
  try {
    const datos_region ={
        nombre_region: nuevaRegion.nombre_pais,
        id_pais: parseInt(nuevaRegion.id_pais)
    };

    const respuesta = await api.post("/region", datos_region);
    return respuesta.data;
  } catch (error) {
    console.error("Error al agregar la region:", error);
    throw error;
  }
};

export const actualizarRegion = async (RegionActualizada) => {
  try {
    const datos_region = {
      id_region: parseInt(RegionActualizada.id_region),
      nombre_region: RegionActualizada.nombre_pais,
      id_pais: parseInt(RegionActualizada.id_pais)
    };

    const respuesta = await api.put("/region", datos_region);
    return respuesta.data;
  } catch (error) {
    console.error("Error al actualizar la region:", error);
    throw error;
  }
};

export const eliminarRegion = async (id_region) => {
    try {
        const idRegionNumerico = parseInt(id_region);

        const respuesta = await api.delete(`/region/${idRegionNumerico}`);
        return respuesta.data;
    } catch (error) {
        console.error("error al eliminar la region: ", error)
        throw error;
    }
};