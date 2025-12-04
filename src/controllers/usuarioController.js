import {
  //agregarUsuarioService,
  obtenerTodosUsuariosService,
  obtenerUsuarioIdService,
 // modificarUsuarioService,
  //eliminarUsuarioService,
} from "../services/usuarioService.js";

import { obtenerTodosRolesService } from "../services/roleService.js";
import { renderizarListaUsuarios, renderizarUsuario } from "../views/responseViewUsuario.js";

export async function obtenerTodosUsuariosController(req, res) {
  try {
    const usuarios = await obtenerTodosUsuariosService();

    res.render("usuarios/mostrarAllUsuarios", {
      title: "Lista de Usuarios",
      usuarios: renderizarListaUsuarios(usuarios),
      navbarLinks: [
        { text: "Inicio", href: "/", icon: "/icons/home.svg" },
        { text: "Usuarios", href: "/usuarios", icon: "/icons/user.svg" },
        { text: "Contacto", href: "/contact", icon: "/icons/contact.svg" },
      ],
    });
  } catch (error) {
    res.status(500).send({
      mensaje: "Error al obtener los usuarios",
      error: error.message,
    });
  }
}

export async function obtenerUsuarioIdController(req, res) {
  try {
    const { id } = req.params;
    const usuario = await obtenerUsuarioIdService(id);
    const roles = await obtenerTodosRolesService();

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

export async function mostrarAgregarUsuarioController(req, res) {
  try {
    const roles = await obtenerTodosRolesService();

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
