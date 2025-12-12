import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';

/*export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Formato: "Bearer TOKEN"
    
    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // { id: userId, role: roleId }
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Token inválido o expirado' });
    }
};*/



export function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ mensaje: "Token no proporcionado" });
  }

  const token = authHeader.split(" ")[1]; // "Bearer token"

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
    if (err) {
      return res.status(403).json({ mensaje: "Token inválido" });
    }

    // MUY IMPORTANTE
    req.user = decodedUser;

    console.log("USUARIO DEL TOKEN:", req.user);

    next();
  });
}


export const hasPermission = (requiredPermission) => {
    return async (req, res, next) => {
        try {
            if (!req.user) {
                return res.status(401).json({ message: 'No autenticado' });
            }

            // Buscar usuario con rol y permisos populados
            const user = await Usuario.findById(req.user.id)
                .populate({
                    path: 'role',
                    populate: { path: 'permissions' }
                });

            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            if (!user.role || !user.role.permissions) {
                return res.status(403).json({ 
                    message: 'Usuario sin rol o permisos asignados' 
                });
            }

            // Verificar si el permiso existe
            const permissionFound = user.role.permissions.some(
                perm => perm.name === requiredPermission
            );

            if (!permissionFound) {
                return res.status(403).json({ 
                    message: `No tienes el permiso: ${requiredPermission}` 
                });
            }

            next();
        } catch (error) {
            console.error('Error en hasPermission:', error);
            res.status(500).json({ message: 'Error verificando permisos' });
        }
    };
};