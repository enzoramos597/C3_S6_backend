import Usuario from "../models/Usuario.js";
import IRepository from "./IRepository.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class UsuarioRepository extends IRepository{
  // =======================================
  // CREAR USUARIO
  // =======================================
  /*async agregarUsuarioRepository(data) {
    const { correo } = data;

    // Verificar correo duplicado
    const existe = await Usuario.findOne({ correo: correo.trim().toLowerCase() });
    if (existe) {
      throw new Error(`El correo "${correo}" ya existe.`);
    }

    const nuevoUsuario = new Usuario(data);
    return await nuevoUsuario.save();
  } */

 

async agregarUsuarioRepository(data) {
    const { correo, contrasenia } = data;

    // Validar correo duplicado
    const existe = await Usuario.findOne({ correo: correo.trim().toLowerCase() });
    if (existe) {
        throw new Error(`El correo "${correo}" ya existe.`);
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(contrasenia, 10);

    // Crear usuario con contraseña encriptada
    const nuevoUsuario = new Usuario({
        ...data,
        correo: correo.trim().toLowerCase(),
        contrasenia: hashedPassword
    });

    await nuevoUsuario.save();

    // Eliminar la contraseña del objeto antes de devolverlo
    const usuarioSinPass = nuevoUsuario.toObject();
    delete usuarioSinPass.contrasenia;

    // (OPCIONAL) Crear token igual que el register original
    const token = jwt.sign(
        { id: nuevoUsuario._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    return { usuario: usuarioSinPass, token };
}


  // =======================================
  // OBTENER TODOS LOS USUARIOS
  // =======================================
  async obtenerTodosUsuariosRepository() {
    return await Usuario.find()
      .populate("perfiles")
      .populate("favoritos")
      .populate("role");
  }

  // =======================================
  // OBTENER USUARIO POR ID
  // =======================================
  async obtenerUsuarioIdRepository(id) {
    const usuario = await Usuario.findById(id)
      .populate("role");
    if (!usuario) {
      throw new Error("Usuario no encontrado");
    }

    return usuario;
  }

  // =======================================
  // MODIFICAR USUARIO
  // =======================================
  async modificarUsuarioRepository(id, data) {
    const usuario = await Usuario.findById(id);

    if (!usuario) {
      throw new Error("Usuario no encontrado");
    }

    // Si cambia correo, validar
    if (data.correo && data.correo !== usuario.correo) {
      const existeEmail = await Usuario.findOne({ correo: data.correo.trim().toLowerCase() });
      if (existeEmail) {
        throw new Error(`El correo "${data.correo}" ya está en uso.`);
      }
    }

    const actualizado = await Usuario.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    return actualizado;
  }

  // =======================================
  // ELIMINAR USUARIO
  // =======================================
  async eliminarUsuarioRepository(id) {
    const eliminado = await Usuario.findByIdAndDelete(id);

    if (!eliminado) {
      throw new Error("Usuario no encontrado");
    }

    return eliminado;
  }
}

export default new UsuarioRepository();
