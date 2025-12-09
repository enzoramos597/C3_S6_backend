
import {
  agregarUsuarioService,
  obtenerTodosUsuariosService,
  obtenerUsuarioIdService,
  modificarUsuarioService,
  eliminarUsuarioService,
} from "../services/usuarioService.js";

import { obtenerTodosLosRolesService } from "../services/roleService.js";

import { renderizarListaUsuarios, renderizarUsuario } from "../views/responseViewUsuario.js";


// =======================================
// OBTENER TODOS LOS USUARIOS
// =======================================
export async function obtenerTodosUsuariosController(req, res) {
  try {
    const usuarios = await obtenerTodosUsuariosService();

    {/*res.render("usuarios/mostrarAllUsuarios", {
      title: "Lista de Usuarios",
      usuariosFormateados: renderizarListaUsuarios(usuarios),  // ✅ AGREGAR "Formateados"
      navbarLinks: [
        { text: "Inicio", href: "/", icon: "/icons/home.svg" },
        { text: "Usuarios", href: "/usuarios", icon: "/icons/user.svg" },
        { text: "Contacto", href: "/contact", icon: "/icons/contact.svg" },
      ],
    });*/}
    res.json({
      mensaje: "Usuarios obtenidos correctamente",
      usuarios
    });
  } catch (error) {
    res.status(500).send({
      mensaje: "Error al obtener los usuarios",
      error: error.message,
    });
  }
}

// =======================================
// OBTENER USUARIO POR ID
// =======================================
export async function obtenerUsuarioIdController(req, res) {
  try {
    const { id } = req.params;

    const usuario = await obtenerUsuarioIdService(id);
    const roles = await obtenerTodosLosRolesService();

    res.render("usuarios/modificarUsuario", {
      title: "Modificar Usuario",
      usuario,
      roles,
      navbarLinks: [
        { text: "Inicio", href: "/", icon: "/icons/home.svg" },
        { text: "Usuarios", href: "/usuarios", icon: "/icons/user.svg" },
        { text: "Contacto", href: "/contact", icon: "/icons/contact.svg" },
      ],
    });
  } catch (error) {
    return res.status(404).send({
      mensaje: "Usuario no encontrado",
      error: error.message,
    });
  }
}

// =======================================
// FORMULARIO AGREGAR
// =======================================
export async function mostrarAgregarUsuarioController(req, res) {
  try {
    const roles = await obtenerTodosLosRolesService();

    res.render("usuarios/agregarUsuario", {
      title: "Agregar Usuario",
      roles,
      navbarLinks: [
        { text: "Inicio", href: "/", icon: "/icons/home.svg" },
        { text: "Usuarios", href: "/usuarios", icon: "/icons/user.svg" },
        { text: "Contacto", href: "/contact", icon: "/icons/contact.svg" },
      ],
    });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
}

// =======================================
// CREAR USUARIO
// =======================================
export async function agregarUsuarioController(req, res) {
  try {
    const datos = req.body;

    const usuarioCreado = await agregarUsuarioService(datos);

    return res.status(201).json({
      result: "success",
      data: renderizarUsuario(usuarioCreado)
    });

  } catch (error) {
    console.error("❌ ERROR CONTROLLER:", error.message);

    if (error.message.toLowerCase().includes("correo")) {
      return res.status(400).json({
        result: "error",
        mensaje: error.message,
      });
    }

    return res.status(500).json({
      result: "error",
      mensaje: "Error interno al crear usuario",
      error: error.message,
    });
  }
}

// =======================================
// MODIFICAR USUARIO
// =======================================
export async function modificarUsuarioController(req, res) {
  try {
    const { id } = req.params;
    const datosActualizados = req.body;

    const usuarioModificado = await modificarUsuarioService(id, datosActualizados);

    return res.json({
      result: "success",
      data: usuarioModificado,
    });
  } catch (error) {
    console.error("❌ ERROR CONTROLLER:", error.message);

    if (error.message.toLowerCase().includes("correo")) {
      return res.status(400).json({
        result: "error",
        mensaje: error.message,
      });
    }

    return res.status(500).json({
      result: "error",
      mensaje: "Error al modificar usuario",
      error: error.message,
    });
  }
}

// =======================================
// ELIMINAR USUARIO
// =======================================
export async function eliminarUsuarioController(req, res) {
  try {
    const { id } = req.params;

    await eliminarUsuarioService(id);

    res.json({ result: "success" });
  } catch (error) {
    return res.status(404).json({
      result: "error",
      mensaje: error.message,
    });
  }
}
