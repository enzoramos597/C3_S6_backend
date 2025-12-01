// ===============================
// FUNCIONES DE PRESENTACIÓN (VIEW)
// ===============================

// Formatea una película individual
export function renderizarPelicula(pelicula) {
  return {
    id: pelicula._id,
    "Título Original": pelicula.original_title,
    Detalle: pelicula.detalle,
    Actores: pelicula.actores,
    Poster: pelicula.poster,
    Género: pelicula.genero,
    Director: pelicula.Director,
    Tipo: pelicula.type,
    Link: pelicula.link,
    Año: pelicula.anio,
    Estado: pelicula.estado,
    //"Agregada por (Usuario)": pelicula.usuario
  };
}

// Formatea una lista completa de películas
export function renderizarListaPeliculas(peliculas) {
  return peliculas.map((pelicula) => renderizarPelicula(pelicula));
}

// Mensaje genérico JSON
export function renderizarMensaje(mensaje) {
  return JSON.stringify({ mensaje }, null, 2);
}
