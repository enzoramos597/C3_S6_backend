import { error } from "console";
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

  const existe = await Pelicula.findOne({ original_title: original_title.trim() });

  if (existe) {
    console.log("pelicula existe");
    throw new Error(`Pelicula "${original_title}" ya existe`);
  }

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

  return await newPeli.save();
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
