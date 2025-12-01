import Pelicula from "../models/Pelicula.js";
import { validationResult } from "express-validator";

export const listarPeliculas = async (req, res) => {
  const peliculas = await Pelicula.find();
  res.render("peliculas/listar", { peliculas });
};

export const mostrarFormCrear = (req, res) => {
  res.render("peliculas/crear", { errores: [], old: {} });
};

export const crearPelicula = async (req, res) => {
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.render("peliculas/crear", {
      errores: errores.array(),
      old: req.body,
    });
  }

  try {
    await Pelicula.create(req.body);
    res.redirect("/peliculas");
  } catch (error) {
    res.send("❌ Error al guardar película: " + error.message);
  }
};

export const mostrarFormEditar = async (req, res) => {
  const pelicula = await Pelicula.findById(req.params.id);
  res.render("peliculas/editar", { pelicula, errores: [] });
};

export const editarPelicula = async (req, res) => {
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    const pelicula = await Pelicula.findById(req.params.id);
    return res.render("peliculas/editar", {
      pelicula,
      errores: errores.array(),
    });
  }

  try {
    await Pelicula.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/peliculas");
  } catch (error) {
    res.send("❌ Error al editar película: " + error.message);
  }
};

export const eliminarPelicula = async (req, res) => {
  await Pelicula.findByIdAndDelete(req.params.id);
  res.redirect("/peliculas");
};
