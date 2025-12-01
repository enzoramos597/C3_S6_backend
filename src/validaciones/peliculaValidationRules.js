import { body } from "express-validator";
import mongoose from "mongoose";

export const peliculaValidationRules = () => [

  // ===============================
  // original_title
  // ===============================
  body("original_title")
    .notEmpty().withMessage("El título original no debe estar vacío.")
    .isString().withMessage("El título original debe ser una cadena.")
    .isLength({ min: 2, max: 120 })
    .withMessage("El título original debe tener entre 2 y 120 caracteres.")
    .custom((value) => {
      if (value.trim() !== value)
        throw new Error("El título original no debe tener espacios al inicio o final.");
      return true;
    }),

  // ===============================
  // detalle
  // ===============================
  body("detalle")
    .notEmpty().withMessage("El detalle no debe estar vacío.")
    .isString().withMessage("El detalle debe ser una cadena.")
    .isLength({ min: 10, max: 500 })
    .withMessage("El detalle debe tener entre 10 y 500 caracteres.")
    .custom((value) => {
      if (value.trim() !== value)
        throw new Error("El detalle no debe tener espacios al inicio o final.");
      return true;
    }),

  // ===============================
  // actores (array)
  // ===============================
  body("actores")
    .isArray().withMessage("Actores debe ser un array.")
    .custom((arr) => {
      arr.forEach(a => {
        if (!a.trim()) return; // Ignorar vacíos
        if (a.length < 3 || a.length > 80)
          throw new Error("Cada actor debe tener entre 3 y 80 caracteres.");
      });
      return true;
    }),

  // ===============================
  // poster (URL string)
  // ===============================
  body("poster")
    .notEmpty().withMessage("El poster es obligatorio.")
    .isString().withMessage("El poster debe ser una cadena.")
    .custom((value) => {
      if (value.trim() !== value)
        throw new Error("El poster no debe tener espacios al inicio o final.");
      return true;
    }),

  // ===============================
  // genero (array)
  // ===============================
  body("genero")
    .isArray().withMessage("El género debe ser un array.")
    .custom((arr) => {
      arr.forEach(g => {
        if (!g.trim()) return; // Ignorar vacíos
        if (g.length < 3 || g.length > 40)
          throw new Error("Cada género debe tener entre 3 y 40 caracteres.");
      });
      return true;
    }),

  // ===============================
  // Director (array)
  // ===============================
  body("Director")
    .isArray().withMessage("Director debe ser un array.")
    .custom((arr) => {
      arr.forEach(d => {
        if (!d.trim()) return; // Ignorar vacíos
        if (d.length < 3 || d.length > 80)
          throw new Error("Cada director debe tener entre 3 y 80 caracteres.");
      });
      return true;
    }),

  // ===============================
  // type (movies / series)
  // ===============================
 body("type")
  .customSanitizer((value) => {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    return value.split(',').map(t => t.trim());
  })
  .custom((arr) => {
    const valid = ["movie", "movies", "series", "serie", "pelicula", "peliculas", "apt"];
    arr.forEach(t => {
      if (!t.trim()) return;
      if (!valid.includes(t.toLowerCase())) {
        throw new Error("El campo type contiene valores no permitidos.");
      }
    });
    return true;
  }),

  // ===============================
  // link
  // ===============================
  body("link")
    .optional({ nullable: true })
    .isString().withMessage("El link debe ser una cadena.")
    .custom(value => {
      if (!value) return true;
      if (value.trim() !== value)
        throw new Error("El link no debe tener espacios al inicio o final.");
      return true;
    }),

  // ===============================
  // año
  // ===============================
  body("anio")
    .toInt() // Convierte string a número
    .isInt({ min: 1900, max: new Date().getFullYear() })
    .withMessage("El año debe ser válido."),

  // ===============================
  // estado
  // ===============================
  body("estado")
    .isString().withMessage("El estado debe ser una cadena.")
    .isIn(["activo", "inactivo"])
    .withMessage("El estado debe ser 'activo' o 'inactivo'.")
];

