import {
  agregarUsuarioService,
  obtenerTodosUsuariosService,
  obtenerUsuarioIdService,
  modificarUsuarioService,
  eliminarUsuarioService,
} from "../services/usuarioService.js";

import { obtenerTodosLosRolesService } from "../services/roleService.js";
import Usuario from "../models/Usuario.js";
//import Role from "../models/Role.js";
import {
  renderizarListaUsuarios,
  renderizarUsuario,
} from "../views/responseViewUsuario.js";
import Role from "../models/Role.js";

// =======================================
// OBTENER TODOS LOS USUARIOS
// =======================================
export async function obtenerTodosUsuariosController(req, res) {
  try {
    const usuarios = await obtenerTodosUsuariosService();

    {
      /*res.render("usuarios/mostrarAllUsuarios", {
      title: "Lista de Usuarios",
      usuariosFormateados: renderizarListaUsuarios(usuarios),  // ✅ AGREGAR "Formateados"
      navbarLinks: [
        { text: "Inicio", href: "/", icon: "/icons/home.svg" },
        { text: "Usuarios", href: "/usuarios", icon: "/icons/user.svg" },
        { text: "Contacto", href: "/contact", icon: "/icons/contact.svg" },
      ],
    });*/
    }
    res.json({
      mensaje: "Usuarios obtenidos correctamente",
      usuarios,
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

// Nuevo obtenerUsuarioIdController
export async function obtenerUsuarioId2Controller(req, res) {
  try {
    const { id } = req.params;

    // 🚨 Seguridad: solo ver su propio usuario
    if (req.user.id !== id) {
      return res.status(401).json({
        result: "error",
        mensaje: "No estás autorizado para ver este usuario",
      });
    }

    const usuario = await obtenerUsuarioIdService(id);

    return res.json({
      result: "success",
      data: usuario,
    });

  } catch (error) {
    return res.status(404).json({
      result: "error",
      mensaje: "Usuario no encontrado",
      error: error.message,
    });
  }
}


export async function obtenerUsuarioId3Controller(req, res) {
  try {
    // 1. Verificar token válido
    if (!req.user || !req.user.role) {
      return res.status(401).json({
        result: "error",
        mensaje: "Token no válido o faltante",
      });
    }

    // 2. Buscar el role en la BD usando el ID del token
    const roleDB = await Role.findById(req.user.role);

    if (!roleDB) {
      return res.status(403).json({
        result: "error",
        mensaje: "Rol no encontrado",
      });
    }

    // 3. Validar si es admin
    if (roleDB.name !== "admin") {
      return res.status(403).json({
        result: "error",
        mensaje: "Acceso denegado: solo administradores pueden ver todos los usuarios",
      });
    }

    // 4. Obtener todos los usuarios
    const usuarios = await obtenerTodosUsuariosService();

    return res.json({
      result: "success",
      data: usuarios,
    });

  } catch (error) {
    return res.status(500).json({
      result: "error",
      mensaje: "Error al obtener los usuarios",
      error: error.message
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
{
  /*export async function agregarUsuarioController(req, res) {
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
}*/
} 

export async function agregarUsuarioController(req, res) {
  try {
    const datos = req.body;

    // ================================
    // 1. Validar si el correo YA existe
    // ================================
    const existeCorreo = await Usuario.findOne({ correo: datos.correo });

    if (existeCorreo) {
      return res.status(400).json({
        result: "error",
        mensaje: `El correo '${datos.correo}' ya está registrado.`,
      });
    }

    // ================================
    // 2. Validar que el rol exista
    // ================================
    const role = await Role.findOne({ name: datos.role });

    if (!role) {
      return res.status(400).json({
        result: "error",
        mensaje: `El rol '${datos.role}' no existe`,
      });
    }

    // Reemplazar rol string → ObjectId real
    datos.role = role._id;

    // ================================
    // 3. Crear usuario
    // ================================
    const usuarioCreado = await agregarUsuarioService(datos);

    return res.status(201).json({
      result: "success",
      mensaje: "Usuario creado correctamente",
      data: usuarioCreado,
    });
  } catch (error) {
    console.error("❌ ERROR CONTROLLER:", error.message);

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
{
  /*export async function modificarUsuarioController(req, res) {
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
}*/
}
{
  /*export async function modificarUsuarioController(req, res) {
  try {
    const { id } = req.params;
    const datosActualizados = req.body;

    // ====================================
    // 1. Validar correo único (si lo envía)
    // ====================================
    if (datosActualizados.correo) {
      const existeCorreo = await Usuario.findOne({
        correo: datosActualizados.correo,
        _id: { $ne: id } // excluye al propio usuario
      });

      if (existeCorreo) {
        return res.status(400).json({
          result: "error",
          mensaje: `El correo '${datosActualizados.correo}' ya está en uso.`
        });
      }
    }

    // ====================================
    // 2. Validar rol (si lo envía)
    // ====================================
    if (datosActualizados.role) {
      const role = await Role.findOne({ name: datosActualizados.role });

      if (!role) {
        return res.status(400).json({
          result: "error",
          mensaje: `El rol '${datosActualizados.role}' no existe`
        });
      }

      datosActualizados.role = role._id;
    }

    // ====================================
    // 3. Modificar usuario
    // ====================================
    const usuarioModificado = await modificarUsuarioService(id, datosActualizados);

    return res.json({
      result: "success",
      data: usuarioModificado,
    });

  } catch (error) {
    console.error("❌ ERROR CONTROLLER:", error.message);

    return res.status(500).json({
      result: "error",
      mensaje: "Error al modificar usuario",
      error: error.message,
    });
  }
}*/
}

//nuevo modificarusuariocontroller
export async function modificarUsuarioController(req, res) {
  try {
    const { id } = req.params;
    const datosActualizados = req.body; // Esto incluye { favoritos: ['id1', 'id2', ...] } // ... (Código de validación de correo, que ya tienes) // ==================================== // 2. Actualizar el Usuario en la DB // ==================================== // 🛑 NECESITAS APLICAR EL UPDATE REAL AQUÍ

    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      id,
      datosActualizados, // Aquí se pasan los 'favoritosIds'
      { new: true } // Para retornar el documento modificado
    );

    if (!usuarioActualizado) {
      return res.status(404).json({
        result: "error",
        mensaje: "Usuario no encontrado para la actualización",
      });
    } // 3. Responder con éxito // 💡 Asegúrate de no enviar datos sensibles como la contraseña o el token aquí

    return res.status(200).json({
      result: "ok",
      mensaje: "Usuario modificado correctamente",
      usuario: usuarioActualizado, // O los datos que tu frontend espera para refrescar
    });
  } catch (error) {
    console.error("Error al modificar usuario:", error); // ✅ IMPORTANTE: Si es un CastError, daremos un mensaje más específico.

    if (error.name === "CastError") {
      return res.status(400).json({
        result: "error",
        mensaje: "ID o formato de dato inválido.",
        error: error.message,
      });
    }
    return res.status(500).json({
      result: "error",
      mensaje: "Error al modificar usuario",
      error: error.message, // Muestra el error de Mongoose para debug
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

    res.json({ result: "success, Usuario eliminado satisfactoriamente" });
  } catch (error) {
    return res.status(404).json({
      result: "error",
      mensaje: error.message,
    });
  }
}

export async function obtenerUsuarioIdAdminController(req, res) {
  try {
    const { id } = req.params;

    // 1. Verificar token válido
    if (!req.user || !req.user.role) {
      return res.status(401).json({
        result: "error",
        mensaje: "Token no válido o faltante",
      });
    }

    // 2. Verificar que el rol sea admin
    const roleDB = await Role.findById(req.user.role);

    if (!roleDB || roleDB.name !== "admin") {
      return res.status(403).json({
        result: "error",
        mensaje: "Acceso denegado: solo administradores",
      });
    }

    // 3. Buscar usuario por ID
    const usuario = await obtenerUsuarioIdService(id);

    if (!usuario) {
      return res.status(404).json({
        result: "error",
        mensaje: "Usuario no encontrado",
      });
    }

    // 4. Respuesta final
    return res.json({
      result: "success",
      data: usuario,
    });

  } catch (error) {
    return res.status(500).json({
      result: "error",
      mensaje: "Error al obtener el usuario",
      error: error.message,
    });
  }
}

