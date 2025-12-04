// ===============================
// FUNCIONES DE PRESENTACIÓN (VIEW) - USUARIOS
// ===============================

// Formatea un usuario
export function renderizarUsuario(usuario) {
  return {
    id: usuario._id,
    Nombre: usuario.name,  // ✅ Cambié de 'nombre' a 'name'
    Apellido: usuario.apellido,
    Correo: usuario.correo,
    Avatar: usuario.avatar || "https://i.pinimg.com/originals/34/65/cd/3465cda198db3eef055503fbb826e526.jpg",  // ✅ Agregué default
    Estado: usuario.estado === 1 ? "Activo" : "Inactivo",  // ✅ Convertí número a texto
    Rol: usuario.role 
      ? (typeof usuario.role === "object" ? usuario.role.name : usuario.role.toString())
      : "Sin rol",  // ✅ Cambié 'roles' a 'role' (singular) y manejo si no está populado
    Perfiles: usuario.perfiles && usuario.perfiles.length > 0
      ? usuario.perfiles.map(p => typeof p === "object" ? p.name : p.toString())
      : [],  // ✅ Manejo array vacío
    Favoritos: usuario.favoritos && usuario.favoritos.length > 0
      ? usuario.favoritos.map(f => typeof f === "object" ? f.original_title : f.toString())
      : [],  // ✅ Manejo array vacío
    Creado: usuario.createdAt ? usuario.createdAt.toLocaleString() : null,
    Actualizado: usuario.updatedAt ? usuario.updatedAt.toLocaleString() : null,
  };
}

// Lista de usuarios
export function renderizarListaUsuarios(usuarios) {
  return usuarios.map(u => renderizarUsuario(u));
}