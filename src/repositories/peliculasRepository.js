import Pelicula from "../models/Pelicula.js";
import IRepository from "./IRepository.js";

class PeliculaRepository extends IRepository {

  // Obtener Película por ID
  async obtenerPeliculaIdRepository(id) {
    return await Pelicula.findById(id);
  }

  // Obtener todas las Películas (puede filtrarse después por género, estado, etc.)
  async obtenerTodasLasPeliculasRepository() {
    return await Pelicula.find();
  }

  // Agregar Película
  async agregarPeliculaRepository(data) {
    const {
      original_title,
      detalle,
      actores,
      poster,
      genero,
      Director,
      type,
      link,
      anio,
      estado,
    } = data;

    const newPeli = new Pelicula({
      original_title,
      detalle,
      actores,
      poster,
      genero,
      Director,
      type,
      link,
      anio,
      estado,
    });

    const peliculaGuardada = await newPeli.save();
    return peliculaGuardada;
  }

  // Actualizar Película
  async updatePeliculaRepository(id, updateData) {
    const peliActualizada = await Pelicula.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    console.log("Película actualizada:", peliActualizada);
    return peliActualizada;
  }

  // Eliminar Película por ID
  async eliminarPeliculaIdRepository(id) {
    return await Pelicula.findByIdAndDelete(id);
  }
}

export default new PeliculaRepository();
