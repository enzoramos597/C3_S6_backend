// =======================================
// IMPORTACIÓN DE SERVICIOS Y DEPENDENCIAS
// =======================================

// Importa el servicio de Películas
import {
  obtenerPeliculaIdService,
  obtenerTodasLasPeliculasService,
  agregarPeliculaService,
  modificarPeliculaService,
  eliminarPeliculaIdService,
} from "../services/peliculaService.js";

// Importa vista para formateo de respuesta (si usás una)
import { renderizarListaPeliculas } from "../views/responseViewPeli.js";

// Importa el modelo de Mongoose
import Pelicula from "../models/Pelicula.js";

// =======================================
// CONTROLADOR: OBTENER PELÍCULA POR ID
// =======================================
export async function obtenerPeliculaIdController(req, res) {
  try {
    const { id } = req.params;
    console.log(`Traer ID de Película:`, id);

    const pelicula = await obtenerPeliculaIdService(id);

    if (!pelicula) {
      return res.status(404).send({ mensaje: "Película no encontrada" });
    }

    res.render("peliculas/modificarPelicula", {
      title: "Modificar Película",
      pelicula,
      navbarLinks: [
        { text: "Inicio", href: "/", icon: "/icons/home.svg" },
        { text: "Películas", href: "/peliculas", icon: "/icons/movie.svg" },
        { text: "Contacto", href: "/contact", icon: "/icons/contact.svg" },
      ],
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      mensaje: "Error al obtener la Película",
      error: error.message,
    });
  }
}

// =======================================
// CONTROLADOR: MODIFICAR PELÍCULA
// =======================================
export async function modificarPeliculaController(req, res) {
  try {
    const { id } = req.params;
    const datosActualizados = req.body;

    console.log("Modificar Película ID:", id);
    console.log("Datos recibidos:", datosActualizados);

    const peliculaModificada = await modificarPeliculaService(id, datosActualizados);

    if (!peliculaModificada) {
      return res.status(404).send({ mensaje: "No se pudo modificar la película" });
    }

    const peliculaFormateada = {
      id: peliculaModificada._id,
      original_title: peliculaModificada.original_title,
      detalle: peliculaModificada.detalle,
      actores: peliculaModificada.actores,
      poster: peliculaModificada.poster,
      genero: peliculaModificada.genero,
      Director: peliculaModificada.Director,
      type: peliculaModificada.type,
      link: peliculaModificada.link,
      anio: peliculaModificada.anio,
      estado: peliculaModificada.estado,
    };

    return res.json({ result: "success", peliculaFormateada });
  } catch (error) {
    res.status(500).send({
      mensaje: "Error al modificar la película",
      error: error.message,
    });
  }
}

// =======================================
// CONTROLADOR: OBTENER TODAS LAS PELÍCULAS
// =======================================
export async function obtenerTodasLasPeliculasController(req, res) {
  try {
    const peliculas = await obtenerTodasLasPeliculasService();

    const peliculasFormateadas = renderizarListaPeliculas(peliculas);
   
    res.render("peliculas/mostrarAllPeliculas", {
      title: "Lista de Películas",
      peliculasFormateadas,
      navbarLinks: [
        { text: "Inicio", href: "/", icon: "/icons/home.svg" },
        { text: "Acerca de", href: "/about", icon: "/icons/info.svg" },
        { text: "Contacto", href: "/contact", icon: "/icons/contact.svg" },
      ],
    });
  } catch (error) {
    res.status(500).send({
      mensaje: "Error al obtener las Películas",
      error: error.message,
    });
  }
}

// =======================================
// CONTROLADOR: AGREGAR PELÍCULA
// =======================================
export async function agregarPeliculaController(req, res) {
  try {
    const datosPelicula = req.body;
    const peliculaCreada = await agregarPeliculaService(datosPelicula);

    return res.json({ result: "success", data: peliculaCreada });
  } catch (error) {
    console.error("❌ ERROR CONTROLLER:", error.message);

    // Si es duplicado
    if (error.message.toLowerCase().includes("ya existe")) {
  return res.status(400).json({
    result: "error",
    mensaje: error.message,
  });
}

    return res.status(500).json({
      result: "error",
      mensaje: "Error interno al crear la película",
      error: error.message,
    });
  }
}



// =======================================
// CONTROLADOR: ELIMINAR PELÍCULA POR ID
// =======================================
export async function eliminarPeliculaController(req, res) {
  try {
    const { id } = req.params;
    console.log("Eliminar Película ID:", id);

    const peliculaEliminada = await eliminarPeliculaIdService(id);

    if (!peliculaEliminada) {
      return res.status(404).send({ mensaje: "No se pudo eliminar la película" });
    }

    res.json({ result: "success" });
  } catch (error) {
    res.status(500).send({
      mensaje: "Error al eliminar la película",
      error: error.message,
    });
  }
}

