import perfilRepository from "../repositories/perfilRepository.js";

import usuarioRepository from "../repositories/usuarioRepository.js";


export async function obtenerPerfilesUsuarioService(usuarioId) {
  return perfilRepository.obtenerPerfilesDeUsuario(usuarioId);
}

export async function crearPerfilService(usuarioId, perfilData) {
  // Aquí puedes añadir lógica de negocio adicional (ej: validaciones de datos)
  return await perfilRepository.crearPerfilRepository(usuarioId, perfilData);
}

export async function obtenerPerfilService(usuarioId, perfilId) {
  return perfilRepository.obtenerPerfilPorIdYUsuario(usuarioId, perfilId);
}

export async function editarPerfilService(usuarioId, perfilId, nuevosDatos) {
  return perfilRepository.editarPerfil(usuarioId, perfilId, nuevosDatos);
}

export async function eliminarPerfilService(usuarioId, perfilId) {
  // Eliminar perfil de la colección
  const eliminado = await perfilRepository.eliminarPerfil(usuarioId, perfilId);

  // Sacar el perfil del array del usuario
  await usuarioRepository.removerPerfil(usuarioId, perfilId);

  return eliminado;
}
