import express from 'express';
import {
    obtenerPeliculaIdController,
    modificarPeliculaController,
    agregarPeliculaController,
    eliminarPeliculaController,
    obtenerTodasLasPeliculasController
} from '../controllers/peliculasController.js'

import { peliculaValidationRules } from '../validaciones/peliculaValidationRules.js';
import { validationHandler } from '../validaciones/errorMiddleware.js';

const routerPeli = express.Router();

routerPeli.get('/mostrarPelicula', obtenerTodasLasPeliculasController)
routerPeli.get('/modificarPelicula-id/:id', obtenerPeliculaIdController)
routerPeli.post('/agregarPelicula', peliculaValidationRules(), validationHandler, agregarPeliculaController);
routerPeli.put('/modificarPelicula/:id', peliculaValidationRules(), validationHandler ,modificarPeliculaController);
routerPeli.delete('/eliminarPelicula/:id', eliminarPeliculaController);

export default routerPeli;