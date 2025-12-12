import Usuario from '../models/Usuario.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class AuthService {

  // ============================
  // REGISTER
  // ============================
  async register(userData) {

    const existingUser = await Usuario.findOne({ correo: userData.correo });
    if (existingUser) throw new Error('El correo ya está registrado');

    const hashedPassword = await bcrypt.hash(userData.contrasenia, 10);

    const user = new Usuario({
      ...userData,
      contrasenia: hashedPassword
    });

    await user.save();

    const userResponse = user.toObject();
    delete userResponse.contrasenia;

    // IMPORTANTE:
    // role en user = ObjectId
    // Por eso hacemos populate ANTES de generar token
    const userWithRole = await Usuario.findById(user._id).populate("role");

    const token = this.generateToken(userWithRole);

    return { user: userResponse, token };
  }


  // ============================
  // LOGIN
  // ============================
  async login(correo, contrasenia) {

    // 1. Buscar usuario CON rol poblado
    const user = await Usuario.findOne({ correo }).populate("role");
    
    if (!user) {
      throw new Error('Correo no encontrado');
    }

    // 2. Comparar contraseña
    const isValidPassword = await bcrypt.compare(contrasenia, user.contrasenia);
    
    if (!isValidPassword) {
      throw new Error('Correo o contraseña incorrectos');
    }

    // 3. Validar que tenga rol asignado
    if (!user.role) {
      throw new Error('Usuario sin rol asignado');
    }

    // 4. Respuesta sin contraseña
    const userResponse = user.toObject();
    delete userResponse.contrasenia;

    // ============================
    // 5. CREAR TOKEN CON NOMBRE DEL ROL
    // ============================
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role.name, // ← IMPORTANTE: usar "name", no "_id"
        roleId: user.role._id  // Por si necesitas el ID también
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return { 
      user: userResponse, 
      token 
    };
  }


  // ============================
  // GENERAR TOKEN CORRECTO
  // ============================
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
