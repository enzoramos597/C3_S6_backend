import Permission from "../models/Permission.js";
import IRepository from "./IRepository.js";

class PermissionRepository extends IRepository {

  async obtenerTodosPermisosRepository() {
    return await Permission.find();
  }

  async obtenerPermisoIdRepository(id) {
    const permiso = await Permission.findById(id);
    if (!permiso) throw new Error("Permiso no encontrado");
    return permiso;
  }

  async agregarPermisoRepository(data) {
    const { name, description } = data;

    const existe = await Permission.findOne({ name: name.trim() });
    if (existe) throw new Error(`El permiso "${name}" ya existe`);

    const nuevoPermiso = new Permission({
      name: name.trim(),
      description,
    });

    return await nuevoPermiso.save();
  }

  async modificarPermisoRepository(id, data) {
    const permiso = await Permission.findById(id);
    if (!permiso) throw new Error("Permiso no encontrado");

    // validar duplicado si cambia el nombre
    if (data.name && data.name !== permiso.name) {
      const duplicado = await Permission.findOne({
        name: data.name.trim(),
        _id: { $ne: id },
      });
      if (duplicado)
        throw new Error(`El permiso "${data.name}" ya está en uso`);
    }

    return await Permission.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async eliminarPermisoRepository(id) {
    const eliminado = await Permission.findByIdAndDelete(id);
    if (!eliminado) throw new Error("Permiso no encontrado");
    return eliminado;
  }
}

export default new PermissionRepository();
