// ===============================
// FUNCIONES DE PRESENTACIÓN (VIEW) - ROLES
// ===============================

// Formatea un role individual
export function renderizarRole(role) {
  return {
    id: role._id,
    Nombre: role.name,
    Descripción: role.description,
    Permisos: role.permissions
      ? role.permissions.map((p) => p.toString()) // ID list
      : [],
    Creado: role.createdAt
      ? role.createdAt.toLocaleString()
      : null,
    Actualizado: role.updatedAt
      ? role.updatedAt.toLocaleString()
      : null,
  };
}

// Formatea una lista completa de roles
export function renderizarListaRoles(roles) {
  return roles.map((r) => renderizarRole(r));
}

// Mensaje genérico JSON (por si necesitás notificaciones)
export function renderizarMensajeRole(mensaje) {
  return JSON.stringify({ mensaje }, null, 2);
}
