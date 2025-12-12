import Perfil from "../models/Perfil.js";

export default {
  obtenerPerfilesDeUsuario(usuarioId) {
    return Perfil.find({ usuario: usuarioId });
  },

  contarPerfilesUsuario(usuarioId) {
    return Perfil.countDocuments({ usuario: usuarioId });
  },

  existePerfilConNombre(usuarioId, nombre) {
    return Perfil.findOne({
      usuario: usuarioId,
      name: nombre
    });
  },

  crearPerfil(usuarioId, perfilData) {
    return Perfil.create({
      ...perfilData,
      usuario: usuarioId,
    });
  },

  obtenerPerfilPorIdYUsuario(usuarioId, perfilId) {
  // Utilizamos findOne para buscar un documento que cumpla ambas condiciones:
  // 1. El ID del perfil (_id: perfilId)
  // 2. El ID del usuario al que está asociado (usuario: usuarioId)
  return Perfil.findOne({
    _id: perfilId,
    usuario: usuarioId,
  });
},
  editarPerfil(usuarioId, perfilId, nuevosDatos) {
    return Perfil.findOneAndUpdate(
      { _id: perfilId, usuario: usuarioId },
      nuevosDatos,
      { new: true }
    );
  },

  eliminarPerfil(usuarioId, perfilId) {
    return Perfil.findOneAndDelete({
      _id: perfilId,
      usuario: usuarioId,
    });
  },

  async crearPerfilRepository(usuarioId, data) {
    const { name, avatar, tipo } = data;

    // 1. Validar duplicado por nombre Y por usuario (case-insensitive)
    const existe = await Perfil.findOne({
        usuario: usuarioId, // Filtra por el usuario específico
        name: { $regex: new RegExp(`^${name.trim()}$`, 'i') } // Búsqueda case-insensitive exacta
    });
    
    if (existe) {
        console.log("perfil existe para este usuario");
        throw new Error(`Ya existe un perfil con el nombre "${name}" para este usuario.`);
    }

    // 2. Opcional: Validar límite de perfiles (Si aplica, como en Netflix, que son 5)
    const count = await Perfil.countDocuments({ usuario: usuarioId });
    if (count >= 5) {
        throw new Error("El usuario ya alcanzó el límite de 5 perfiles.");
    }

    // 3. Crear el nuevo perfil
    const nuevoPerfil = new Perfil({
        name: name.trim(),
        avatar: avatar,
        tipo: tipo,
        usuario: usuarioId, // Se asigna el ID del usuario
    });

    return await nuevoPerfil.save();
}

};
