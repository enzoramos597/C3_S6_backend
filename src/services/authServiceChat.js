import Usuario from '../models/Usuario.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class AuthService {

  // Registrar usuario
  async register(userData) {

    // Verificar si ya existe
    const existingUser = await Usuario.findOne({
      correo: userData.correo
    });

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

    // Preparar respuesta
    const userResponse = user.toObject();
    delete userResponse.contrasenia;

    // Crear token
    const token = this.generateToken(user);

    return { user: userResponse, token };
  }

  // Método para iniciar sesión
async login(correo, contrasenia) {
    // Buscamos el usuario por email
    const user = await Usuario.findOne({ correo });
    if (!user) {
        throw new Error('correo no encontrado');
    }

    // Verificamos si la contraseña es correcta
    //asda87123y8
    const isValidPassword = await bcrypt.compare(contrasenia, Usuario.contrasenia);

    if (!isValidPassword) {
        throw new Error('Correo o contraseña incorrectos');
    }

    
        // Convertimos el usuario a objeto plano y eliminamos la contraseña
        const userResponse = user.toObject();
        delete userResponse.contrasenia;

        // Generamos un nuevo token y retornamos la respuesta
        const token = this.generateToken(Usuario);
        return { Usuario: userResponse, token };

}

  // Generar token JWT
  generateToken(user) {
    return jwt.sign(
      {
        id: user._id
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
  }
}

// EXPORTACIÓN CORRECTA PARA USAR CON "import authService from ..."
export default new AuthService();
