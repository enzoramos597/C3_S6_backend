import {
  obtenerPerfilesUsuarioService,
  crearPerfilService,
  editarPerfilService,
  eliminarPerfilService
} from "../services/perfilService.js";

// ===========================
// LISTAR PERFILES DE USUARIO
// ===========================
export async function obtenerPerfilesUsuarioController(req, res) {
  try {
    const { id } = req.params; // id usuario

    const perfiles = await obtenerPerfilesUsuarioService(id);

    return res.status(200).json({
      mensaje: "Perfiles obtenidos correctamente",
      perfiles,
    });

  } catch (error) {
    return res.status(400).json({
      mensaje: "Error obteniendo perfiles",
      error: error.message,
    });
  }
}

// ===========================
// CREAR PERFIL
// ===========================
export async function crearPerfilController(req, res) {
  try {
    const { id: usuarioId } = req.params; // Suponiendo la ruta /usuario/:id/perfiles
    const perfilData = req.body;
    console.log("Datos recibidos para crear perfil:", perfilData);
    // Validación básica de datos (similar al código de perfil anterior)
    if (!perfilData || !perfilData.name) {
      return res.status(400).json({
        result: "error",
        mensaje: "El body está vacío o falta 'name'",
      });
    }

    const perfilCreado = await crearPerfilService(usuarioId, perfilData);

    return res.status(201).json({ // Usar 201 Created para la creación exitosa
      result: "success",
      data: perfilCreado,
      mensaje: "Perfil creado correctamente",
    });
  } catch (error) {
    console.error("❌ ERROR CREAR PERFIL:", error.message);

    // Manejo de errores específicos (duplicado, límite de perfiles)
    if (error.message.toLowerCase().includes("existe") || error.message.toLowerCase().includes("límite")) {
      return res.status(400).json({
        result: "error",
        mensaje: error.message,
      });
    }

    return res.status(500).json({
      result: "error",
      mensaje: "Error interno al crear el perfil",
      error: error.message,
    });
  }
}


// ===========================
// EDITAR PERFIL
// ===========================
export async function editarPerfilController(req, res) {
  try {
    const { id, perfilId } = req.params;
    const nuevosDatos = req.body;

    const perfilActualizado = await editarPerfilService(id, perfilId, nuevosDatos);

    return res.status(200).json({
      mensaje: "Perfil actualizado correctamente",
      perfil: perfilActualizado,
    });

  } catch (error) {
    return res.status(400).json({
      mensaje: "Error editando perfil",
      error: error.message,
    });
  }
}

// ===========================
// ELIMINAR PERFIL
// ===========================
export async function eliminarPerfilController(req, res) {
  try {
    const { id, perfilId } = req.params;

    const resultado = await eliminarPerfilService(id, perfilId);

    return res.status(200).json({
      mensaje: "Perfil eliminado correctamente",
      resultado,
    });

  } catch (error) {
    return res.status(400).json({
      mensaje: "Error eliminando perfil",
      error: error.message,
    });
  }
}

// La nueva ruta será: /usuario/:usuarioId/perfiles/:perfilId
export async function obtenerPerfilController(req, res) {
  try {
    const { usuarioId, perfilId } = req.params; // Se obtienen ambos IDs

    const perfil = await obtenerPerfilService(usuarioId, perfilId);

    // Si el perfil no se encuentra (o no pertenece al usuario), se devuelve un 404
    if (!perfil) {
      return res.status(404).json({
        mensaje: "Perfil no encontrado o no pertenece al usuario",
      });
    }

    return res.status(200).json({
      mensaje: "Perfil obtenido correctamente",
      perfil,
    });

  } catch (error) {
    // Manejo de errores de base de datos o IDs inválidos
    console.error("❌ ERROR OBTENIENDO PERFIL:", error.message);
    return res.status(500).json({
      mensaje: "Error interno al obtener el perfil",
      error: error.message,
    });
  }
}