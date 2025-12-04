import roleRepository from "../repositories/roleRepository.js";


export async function obtenerTodosLosRolesService() {
  return await roleRepository.obtenerTodosLosRolesRepository();
}

export async function obtenerRoleIdService(id) {
  return await roleRepository.obtenerRoleIdRepository(id);
}

export async function agregarRoleService(pelicula) {
  return await roleRepository.agregarRoleRepository(pelicula);
}

export async function modificarRoleService(id, updatePelicula) {
  return await roleRepository.updateRoleRepository(id, updatePelicula);
}

export async function eliminarRoleService(id) {
  return await roleRepository.eliminarRoleRepository(id);
}

