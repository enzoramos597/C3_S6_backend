import permisoRepository from "../repositories/permissionRepository.js";


export async function obtenerTodosLosPermisosService() {
  return await permisoRepository.obtenerTodosPermisosRepository();
}

export async function obtenerPermisoIdService(id) {
  return await permisoRepository.obtenerPermisoIdRepository(id);
}

export async function agregarPermisoService(permiso) {
  return permisoRepository.agregarPermisoRepository(permiso);
}

export async function modificarPermisoService(id, updatePermiso) {
  return await permisoRepository.modificarPermisoRepository(id, updatePermiso);
}

export async function eliminarPermisoService(id) {
  return await permisoRepository.eliminarPermisoRepository(id);
}