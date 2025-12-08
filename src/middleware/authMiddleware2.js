import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';

export const authenticateToken = ( req, res, next ) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ') [1];
      // Si no hay token, devolvemos error 401 (No autorizado)
      if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    try {
        // Verificamos el token usando la clave secreta
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Guardamos la información del usuario decodificada en el objeto request
        req.user = decoded;
        // Continuamos con la siguiente función middleware
        next();
    } catch (error) {
        // Si el token es inválido, devolvemos error 403 (Prohibido)
        return res.status(403).json({ message: 'Token inválido' });
    }    
};

// Middleware para verificar permisos
export const hasPermission = (requiredPermission) => {
    return async (req, res, next) => {
        try {
            if (!req.user) {
                return res.status(401).json({ message: 'No autenticado' });
            }

            const user = await Usuario.findById(req.user.id)
                .populate({
                    path: 'role',
                    populate: { path: 'permissions' }
                });

            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            const permissionFound = user.role.permissions.some(
                perm => perm.name === requiredPermission
            );

            if (!permissionFound) {
                return res.status(403).json({ 
                    message: 'No tienes permiso para realizar esta acción' 
                });
            }

            next();
        } catch (error) {
            next(error);
        }
    };
};