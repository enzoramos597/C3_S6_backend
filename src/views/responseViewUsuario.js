// ===============================
// FUNCIONES DE PRESENTACIÓN (VIEW) - USUARIOS
// ===============================

// Formatea un usuario
export function renderizarUsuario(usuario) {
  return {
    id: usuario._id,
    Nombre: usuario.nombre,
    Apellido: usuario.apellido,
    Correo: usuario.correo,
    Roles: usuario.roles
      ? usuario.roles.map(r => typeof r === "object" ? r.name : r.toString())
      : [],
    Creado: usuario.createdAt ? usuario.createdAt.toLocaleString() : null,
    Actualizado: usuario.updatedAt ? usuario.updatedAt.toLocaleString() : null,
  };
}

// Lista de usuarios
export function renderizarListaUsuarios(usuarios) {
  return usuarios.map(u => renderizarUsuario(u));
}
