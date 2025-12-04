import {  
  obtenerTodosLosPermisosService,
  obtenerPermisoIdService,
  agregarPermisoService,
  modificarPermisoService,
  eliminarPermisoService
} from "../services/permisoService.js";



export async function mostrarPermisosController(req, res) {
  try {
    const permisos = await obtenerTodosLosPermisosService();

    res.render("permissions/mostrarAllPermiso", { 
      title: "Permisos",
      permisos 
    });

  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
}


export async function agregarPermisoController(req, res) {
  try {
    const nuevo = await agregarPermisoService(req.body);
    res.json({ result: "success", data: nuevo });
  } catch (error) {
    res.status(400).json({ result: "error", mensaje: error.message });
  }
}

export async function obtenerPermisoIdController(req, res) {
  try {
    const { id } = req.params;
    console.log(`🔍 Traer ID de Permiso:`, id);

    const permiso = await obtenerPermisoIdService(id);

    if (!permiso) {
      return res.status(404).send({ mensaje: "Permiso no encontrado" });
    }

    res.render("permissions/modificarPermiso", {
      title: "Modificar Permiso",
      permiso,
      navbarLinks: [
        { text: "Inicio", href: "/", icon: "/icons/home.svg" },
        { text: "Permisos", href: "/mostrarPermiso", icon: "/icons/key.svg" },
        { text: "Contacto", href: "/contact", icon: "/icons/contact.svg" },
      ],
    });

  } catch (error) {
    console.error("❌ Error al obtener permiso:", error);
    res.status(500).send({
      mensaje: "Error al obtener el Permiso",
      error: error.message,
    });
  }
}


export async function modificarPermisoController(req, res) {
  try {
    const { id } = req.params;
    const datosActualizados = req.body;

    console.log("Modificar Permiso ID:", id);
    console.log("Datos recibidos:", datosActualizados);

    const permisoModificado = await modificarPermisoService(id, datosActualizados);

    if (!permisoModificado) {
      return res.status(404).send({ mensaje: "No se pudo modificar el permiso" });
    }

    const permisoFormateado = {
      id: permisoModificado._id,
      name: permisoModificado.name,
      description: permisoModificado.description,
      createdAt: permisoModificado.createdAt,
      updatedAt: permisoModificado.updatedAt
    };

    return res.json({ result: "success", permisoFormateado });

  } catch (error) {
    res.status(500).send({
      mensaje: "Error al modificar el permiso",
      error: error.message,
    });
  }
}


export async function eliminarPermisoController(req, res) {
  try {
    await eliminarPermisoService(req.params.id);
    res.json({ result: "success" });
  } catch (error) {
    res.status(404).json({ mensaje: error.message });
  }
}
