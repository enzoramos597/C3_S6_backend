import express from "express";
import {
  listarPeliculas,
  crearPelicula,
  mostrarFormCrear,
  mostrarFormEditar,
  editarPelicula,
  eliminarPelicula,
} from "../controllers/peliculasController.js";

import { body } from "express-validator";

const router = express.Router();

const validaciones = [
  body("original_title").notEmpty().withMessage("El título es obligatorio"),
  body("detalle").notEmpty().withMessage("El detalle es obligatorio"),
  body("poster").notEmpty().withMessage("El poster es obligatorio"),
];

router.get("/", listarPeliculas);
router.get("/crear", mostrarFormCrear);
router.post("/crear", validaciones, crearPelicula);

router.get("/editar/:id", mostrarFormEditar);
router.post("/editar/:id", validaciones, editarPelicula);

router.get("/eliminar/:id", eliminarPelicula);

export default router;
