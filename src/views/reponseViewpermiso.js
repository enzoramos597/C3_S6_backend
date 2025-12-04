// ===============================
// FUNCIONES DE PRESENTACIÓN (VIEW) - PERMISOS
// ===============================

// Formatea un permiso individual
export function renderizarPermiso(permiso) {
  return {
    id: permiso._id,
    Nombre: permiso.name,
    Descripción: permiso.description,
    Creado: permiso.createdAt
      ? permiso.createdAt.toLocaleString()
      : null,
    Actualizado: permiso.updatedAt
      ? permiso.updatedAt.toLocaleString()
      : null,
  };
}

// Formatea una lista completa de permisos
export function renderizarListaPermisos(permisos) {
  return permisos.map((p) => renderizarPermiso(p));
}

// Mensaje genérico JSON (por si necesitás notificaciones)
export function renderizarMensajePermiso(mensaje) {
  return JSON.stringify({ mensaje }, null, 2);
}
