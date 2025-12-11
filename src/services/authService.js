import Usuario from '../models/Usuario.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class AuthService {

  // Registrar usuario
  async register(userData) {

    // Verificar si ya existe
    const existingUser = await Usuario.findOne({ correo: userData.correo });

    if (existingUser) {
      throw new Error('El correo ya está registrado');
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(userData.contrasenia, 10);

    // Crear usuario
    const user = new Usuario({
      ...userData,
      contrasenia: hashedPassword
    });

    await user.save();

    // Respuesta sin contraseña
    const userResponse = user.toObject();
    delete userResponse.contrasenia;

    // Crear token
    const token = this.generateToken(user);

    return { user: userResponse, token };
  }


  // Login
  async login(correo, contrasenia) {

    // Buscar usuario
    const user = await Usuario.findOne({ correo });
    if (!user) {
      throw new Error('Correo no encontrado');
    }

    // Comparar contraseña
    const isValidPassword = await bcrypt.compare(contrasenia, user.contrasenia);
    if (!isValidPassword) {
      throw new Error('Correo o contraseña incorrectos');
    }

    // Respuesta sin contraseña
    const userResponse = user.toObject();
    delete userResponse.contrasenia;

    // Crear token
    const token = this.generateToken(user);

    return { user: userResponse, token };
  }


  // Generar token JWT
  generateToken(user) {
    return jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
  }
}

export default new AuthService();
