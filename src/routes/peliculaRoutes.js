import express from 'express';
import {
    obtenerPeliculaIdController,
    modificarPeliculaController,
    agregarPeliculaController,
    eliminarPeliculaController,
    obtenerTodasLasPeliculasController
} from '../controllers/peliculasController.js'

import {
    obtenerTodosUsuariosController,
    obtenerUsuarioIdController,
    agregarUsuarioController,
    eliminarUsuarioController,
    modificarUsuarioController,
    mostrarAgregarUsuarioController,
} from '../controllers/usuariosController.js'



import {
    obtenerRoleIdController,    
    obtenerTodosLosRolesController,
    agregarRoleController,
    eliminarRoleController,
    modificarRoleController
} from '../controllers/rolesController.js'

import {
    obtenerPermisoIdController,
    modificarPermisoController,
    eliminarPermisoController,
    agregarPermisoController,
    mostrarPermisosController
} from '../controllers/permisosController.js'

import { peliculaValidationRules } from '../validaciones/peliculaValidationRules.js';
import { validationHandler } from '../validaciones/errorMiddleware.js';
import { login } from '../controllers/authController.js'
import { authenticateToken, hasPermission } from '../middleware/authMiddleware.js'
const routerPeli = express.Router();

//routerPeli.post('/register', register);
routerPeli.post('/api/auth/login', login);
//Routes Peliculas
routerPeli.get('/mostrarPelicula', authenticateToken, hasPermission('read:peliculas'), obtenerTodasLasPeliculasController)
routerPeli.get('/modificarPelicula-id/:id', hasPermission('update:peliculas'), obtenerPeliculaIdController)
routerPeli.post('/agregarPelicula', authenticateToken, hasPermission('create:peliculas'), peliculaValidationRules(), validationHandler, agregarPeliculaController);
routerPeli.put('/modificarPelicula/:id', peliculaValidationRules(), validationHandler ,modificarPeliculaController);
routerPeli.delete('/eliminarPelicula/:id', authenticateToken, hasPermission('delete:peliculas'), eliminarPeliculaController);
//Routes Usuarios
{/*routerPeli.get("/mostrarUsuarios", obtenerTodosUsuariosController);
routerPeli.get("/usuarios/:id", obtenerUsuarioIdController);
routerPeli.post("/agregarUsuario", agregarUsuarioController);
routerPeli.put("modificarUsuario/:id", modificarUsuarioController);
routerPeli.delete("/eliminarUsuario/:id", eliminarUsuarioController);
//routerPeli.get("/mostrarUsuarios", obtenerTodosUsuariosController);
//routerPeli.get("/agregarUsuario", mostrarAgregarUsuarioController);
routerPeli.get("/usuarios/:id", obtenerUsuarioIdController);
routerPeli.post("/agregarUsuario", agregarUsuarioController);
routerPeli.put("/modificarUsuario/:id", modificarUsuarioController);
routerPeli.delete("/eliminarUsuario/:id", eliminarUsuarioController);*/}

// ================== USUARIOS ==================

// Mostrar todos
routerPeli.get("/mostrarUsuarios", obtenerTodosUsuariosController);
routerPeli.post("/agregarUsuario", agregarUsuarioController);
routerPeli.put("/modificarUsuario/:id", modificarUsuarioController);
routerPeli.delete("/eliminarUsuario/:id", eliminarUsuarioController);
routerPeli.get("/agregarUsuario", mostrarAgregarUsuarioController);
//routerPeli.get("/modificarUsuario-id", obtenerUsuarioIdController)
// Crear usuario (POST)
//routerPeli.post("/agregarUsuario", agregarUsuarioController);

// Formulario modificar usuario
routerPeli.get("/usuarios/:id", obtenerUsuarioIdController);

// Guardar modificación de usuario
//routerPeli.post("/modificarUsuario/:id", modificarUsuarioController);

// Eliminar usuario
//routerPeli.delete("/eliminarUsuario/:id", eliminarUsuarioController);


//Roles
routerPeli.get("/mostrarRoles", obtenerTodosLosRolesController);
routerPeli.post("/agregarRole", agregarRoleController);
routerPeli.get("/modificarRole-id/:id", obtenerRoleIdController);
routerPeli.post("/modificarRole/:id", modificarRoleController);
routerPeli.delete("/eliminarRole/:id", eliminarRoleController);


//Permisos
routerPeli.get("/mostrarPermiso", mostrarPermisosController);
routerPeli.post("/agregarPermiso", agregarPermisoController);
routerPeli.get('/modificarPermiso-id/:id', obtenerPermisoIdController)
routerPeli.put("/modificarPermiso/:id", modificarPermisoController);
routerPeli.delete("/eliminarPermiso/:id", eliminarPermisoController);

export default routerPeli;