import Usuario from '../models/Usuario.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

 class AuthService {

    // Método para registrar un nuevo usuario
    async register(userData) {
        // Verificamos si ya existe un usuario con el mismo correo
        const existingUser = await Usuario.findOne({
            $or: [
                { email: userData.correo }
            ]
        });        
        // Si existe lanzamos un error
        if (existingUser) {
            throw new Error('Correo ya existe');
        }

        // Encriptamos la contraseña antes de crear el usuario usando bcrypt
        const hashedPassword = await bcrypt.hash(userData.constrasenia, 10);
        // Creamos una nueva instancia del modelo User con los datos recibidos
        const user = new Usuario({
        ...userData,
        constrasenia: hashedPassword,
        //role: defaultRole._id
    });
    await Usuario.save();  
    //Respuesta del usuario

    // Convertimos el documento mongoose a un objeto plano
    const userResponse = user.toObject();

    // Eliminamos la contraseña por seguridad
    delete userResponse.contrasenia;

    // Generamos un token JWT para el usuario
    const token = this.generateToken(Usuario);
    // Retornamos el usuario (sin password) y su token
    return { Usuario: userResponse, token };
    }

    // Método auxiliar para generar tokens JWT
    generateToken(Usuario) {
    // Creamos un token que incluye el id, rol y permisos del usuario

   /*  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c */
   
    return jwt.sign(
        { 
            id: Usuario._id,
            //role: user.role
        },
        // Usamos la clave secreta del .env
        process.env.JWT_SECRET,
        // El token expira en 24 horas
        { expiresIn: '24h' }
    );
}
 }

 module.exports = new AuthService();