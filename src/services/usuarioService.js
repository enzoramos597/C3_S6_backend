import usuarioRepository from "../repositories/usuarioRepository.js";

export function agregarUsuarioService(data) {
  return usuarioRepository.agregarUsuarioRepository(data);
}

export function obtenerTodosUsuariosService() {
  return usuarioRepository.obtenerTodosUsuariosRepository();
}

export function obtenerUsuarioIdService(id) {
  return usuarioRepository.obtenerUsuarioIdRepository(id);
}

export function modificarUsuarioService(id, data) {
  return usuarioRepository.modificarUsuarioRepository(id, data);
}

export function eliminarUsuarioService(id) {
  return usuarioRepository.eliminarUsuarioRepository(id);
}
