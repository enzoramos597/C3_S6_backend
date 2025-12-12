// =======================================
// IMPORTACIÓN DE SERVICIOS Y DEPENDENCIAS
// =======================================

import {
  obtenerTodosLosRolesService,
  obtenerRoleIdService,
  agregarRoleService,
  modificarRoleService,
  eliminarRoleService
} from "../services/roleService.js";

import Role from "../models/Role.js";

import { renderizarListaRoles } from "../views/responseViewRole.js";
// =======================================
// CONTROLADOR: OBTENER TODOS LOS ROLES
// =======================================
export async function obtenerTodosLosRolesController(req, res) {
  try {
    // Obtener roles desde la capa Service
    const roles = await obtenerTodosLosRolesService();

    // Pasar por el formateador de la capa View
    const rolesFormateados = renderizarListaRoles(roles);

    // Renderizar la vista EJS
   return res.json({
      result: "success",
      data: roles
    });
  } catch (error) {
    res.status(500).send({
      mensaje: "Error al obtener los Roles",
      error: error.message,
    });
  }
}


// =======================================
// CONTROLADOR: OBTENER ROLE POR ID
// =======================================
export async function obtenerRoleIdController(req, res) {
  try {
    const { id } = req.params;

    const role = await obtenerRoleIdService(id);

    if (!role) {
      return res.status(404).json({ mensaje: "Rol no encontrado" });
    }

    res.render("roles/modificarRole", {
      title: "Modificar Rol",
      role,
      navbarLinks: [
        { text: "Inicio", href: "/" },
        { text: "Roles", href: "/roles" },
      ],
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener el rol",
      error: error.message,
    });
  }
}


// =======================================
// CONTROLADOR: CREAR ROLE
// =======================================
export async function agregarRoleController(req, res) {
  try {
    const datos = req.body;
    const roleCreado = await agregarRoleService(datos);

    return res.json({
      result: "success",
      data: roleCreado,
    });
  } catch (error) {
    console.error("❌ ERROR CREAR ROLE:", error.message);

    if (error.message.toLowerCase().includes("existe")) {
      return res.status(400).json({
        result: "error",
        mensaje: error.message,
      });
    }

    return res.status(500).json({
      result: "error",
      mensaje: "Error interno al crear el rol",
      error: error.message,
    });
  }
}


// =======================================
// CONTROLADOR: MODIFICAR ROLE
// =======================================
export async function modificarRoleController(req, res) {
  try {
    const { id } = req.params;
    const datosActualizados = req.body;

    const roleModificado = await modificarRoleService(id, datosActualizados);

    if (!roleModificado) {
      return res.status(404).json({ mensaje: "No se pudo modificar el rol" });
    }

    return res.json({
      result: "success",
      data: roleModificado,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al modificar el rol",
      error: error.message,
    });
  }
}


// =======================================
// CONTROLADOR: ELIMINAR ROLE
// =======================================
export async function eliminarRoleController(req, res) {
  try {
    const { id } = req.params;

    const eliminado = await eliminarRoleService(id);

    if (!eliminado) {
      return res.status(404).json({ mensaje: "No se pudo eliminar el rol" });
    }

    res.json({ result: "success" });

  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar el rol",
      error: error.message,
    });
  }
}
