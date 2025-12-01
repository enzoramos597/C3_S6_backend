{/*import peliculaRepository from "../repositories/peliculasRepository.js"

export async function obtenerTodosLosPaisesServices() { 
    return await peliculaRepository.obtenerTodosLosPaisesRepository();
} 

export async function obtenerPeliculaIdController(id) {
    return await peliculaRepository.obtenerPelicula(id);
}

export async function agregarPeliculaService(agregarPeliculaAll) {
    return await peliculaRepository.agregarPeliculaRepository(agregarPeliculaAll);
}

export async function modificarPeliculaService(id, updatePelicula) {
    return await peliculaRepository.updatePeliculaRepository(id, updatePelicula);
}

export async function eliminarPeliculaIdService(id) {
    return await peliculaRepository.eliminarPeliculaIdService(id);
}*/}

import peliculaRepository from "../repositories/peliculasRepository.js";

export async function obtenerTodosLosPaisesServices() {
  return await peliculaRepository.obtenerTodosLosPaisesRepository();
}

export async function obtenerTodasLasPeliculasService() {
  return await peliculaRepository.obtenerTodasLasPeliculasRepository();
}

export async function obtenerPeliculaIdService(id) {
  return await peliculaRepository.obtenerPeliculaIdRepository(id);
}

export async function agregarPeliculaService(pelicula) {
  return await peliculaRepository.agregarPeliculaRepository(pelicula);
}

export async function modificarPeliculaService(id, updatePelicula) {
  return await peliculaRepository.updatePeliculaRepository(id, updatePelicula);
}

export async function eliminarPeliculaIdService(id) {
  return await peliculaRepository.eliminarPeliculaIdRepository(id);
}