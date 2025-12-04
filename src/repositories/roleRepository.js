import Role from "../models/Role.js";
import IRepository from "./IRepository.js";

class RoleRepository extends IRepository {
  // Obtener Role por ID
  async obtenerRoleIdRepository(id) {
    return await Role.findById(id).populate("permissions");
  }

  // Obtener todos los Roles
  async obtenerTodosLosRolesRepository() {
    return await Role.find().populate("permissions");
  }

  // Agregar Role
  async agregarRoleRepository(data) {
    const { name, description, permissions } = data;

    // validar duplicado por nombre (case-insensitive)
    const existe = await Role.findOne({ name: name.trim() });
    if (existe) {
      console.log("role existe");
      throw new Error(`Role "${name}" ya existe`);
    }

    const newRole = new Role({
      name: name.trim(),
      description,
      permissions: Array.isArray(permissions) ? permissions : (permissions ? [permissions] : []),
    });

    return await newRole.save();
  }

  // Actualizar Role
  async updateRoleRepository(id, updateData) {
    // Evitar conflicto de nombre: si envían name, comprobar duplicado en otro documento
    if (updateData.name) {
      const duplicado = await Role.findOne({ name: updateData.name.trim(), _id: { $ne: id } });
      if (duplicado) {
        throw new Error(`Otro role con el nombre "${updateData.name}" ya existe`);
      }
    }

    const roleActualizado = await Role.findByIdAndUpdate(
      id,
      {
        $set: {
          ...(updateData.name ? { name: updateData.name.trim() } : {}),
          ...(updateData.description ? { description: updateData.description } : {}),
          ...(updateData.permissions ? { permissions: Array.isArray(updateData.permissions) ? updateData.permissions : [updateData.permissions] } : {}),
        }
      },
      { new: true, runValidators: true }
    ).populate("permissions");

    console.log("Role actualizado:", roleActualizado);
    return roleActualizado;
  }

  // Eliminar Role por ID
  async eliminarRoleRepository(id) {
    return await Role.findByIdAndDelete(id);
  }
}

export default new RoleRepository();
