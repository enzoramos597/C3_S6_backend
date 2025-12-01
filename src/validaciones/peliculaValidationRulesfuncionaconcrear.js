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
      if (value.trim() !== value) {
        throw new Error("El título original no debe tener espacios al inicio o final.");
      }
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
      if (value.trim() !== value) {
        throw new Error("El detalle no debe tener espacios al inicio o final.");
      }
      return true;
    }),

  // ===============================
  // actores (array de strings)
  // ===============================
  body("actores")
    .isArray().withMessage("Actores debe ser un array.")
    .custom((actores) => {
      actores.forEach((actor) => {
        if (typeof actor !== "string") {
          throw new Error("Cada actor debe ser una cadena.");
        }
        if (actor.trim() !== actor) {
          throw new Error("Cada actor no debe tener espacios al inicio o al final.");
        }
        if (actor.length < 3 || actor.length > 80) {
          throw new Error("Cada actor debe tener entre 3 y 80 caracteres.");
        }
      });
      return true;
    }),

  // ===============================
  // poster (string / URL)
  // ===============================
  body("poster")
    .notEmpty().withMessage("El poster es obligatorio.")
    .isString().withMessage("El poster debe ser una cadena.")
    .custom((value) => {
      if (value.trim() !== value) {
        throw new Error("El poster no debe tener espacios al inicio o final.");
      }
      return true;
    }),

  // ===============================
  // genero (array de strings)
  // ===============================
  body("genero")
    .isArray().withMessage("El género debe ser un array.")
    .custom((generos) => {
      generos.forEach((genero) => {
        if (typeof genero !== "string") {
          throw new Error("Cada género debe ser una cadena.");
        }
        if (genero.trim() !== genero) {
          throw new Error("Cada género no debe tener espacios al inicio o final.");
        }
        if (genero.length < 3 || genero.length > 40) {
          throw new Error("Cada género debe tener entre 3 y 40 caracteres.");
        }
      });
      return true;
    }),

  // ===============================
  // Director (array de strings)
  // ===============================
  body("Director")
    .isArray().withMessage("Director debe ser un array.")
    .custom((directores) => {
      directores.forEach((dir) => {
        if (typeof dir !== "string") {
          throw new Error("Cada director debe ser una cadena.");
        }
        if (dir.trim() !== dir) {
          throw new Error("Cada director no debe tener espacios al inicio o final.");
        }
        if (dir.length < 3 || dir.length > 80) {
          throw new Error("Cada director debe tener entre 3 y 80 caracteres.");
        }
      });
      return true;
    }),

  // ===============================
  // type (movies / series)
  // ===============================
  body("type")
    .isArray().withMessage("El campo type debe ser un array.")
    .custom((types) => {
      types.forEach((t) => {
        if (!["movie", "series", "pelicula", "serie"].includes(t.toLowerCase())) {
          throw new Error("El type debe ser 'movie' o 'series'.");
        }
      });
      return true;
    }),

  // ===============================
  // link (opcional, pero si existe debe ser string)
  // ===============================
  body("link")
    .optional()
    .isString().withMessage("El link debe ser una cadena.")
    .custom((value) => {
      if (value && value.trim() !== value) {
        throw new Error("El link no debe tener espacios al inicio o final.");
      }
      return true;
    }),

  // ===============================
  // año
  // ===============================
  body("anio")
    .isInt({ min: 1900, max: new Date().getFullYear() })
      .withMessage("El año debe ser un número válido mayor a 1900 y no superior al actual."),

  // ===============================
  // estado
  // ===============================
  body("estado")
    .isString().withMessage("El estado debe ser una cadena.")
    .isIn(["activo", "inactivo"])
      .withMessage("El estado debe ser 'activo' o 'inactivo'."),

  // ===============================
  // usuario (ObjectId obligatorio)
  // ===============================
  //body("usuario")
  //  .notEmpty().withMessage("El usuario es obligatorio.")
  //  .custom((value) => {
  //    if (!mongoose.Types.ObjectId.isValid(value)) {
  //      throw new Error("El usuario debe ser un ObjectId válido.");
  //    }
  //    return true;
  //  }),
];
