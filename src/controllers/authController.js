import authService from '../services/authService.js';

{/*export const register = async (req, res) => {
  try {
    console.log('Usuario que ingreso a la App hoy'+ req.Usuario.id);
    const result = await authService.register(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.log('Error en registro:', error);
    res.status(400).json({ message: error.message });
  }
};*/}

export const login = async (req, res) => {
    try {
        const { correo, contrasenia } = req.body;
        const result = await authService.login(correo, contrasenia);
        res.json(result);
    } catch (error) {
        console.log('Error en login:', error);
        res.status(401).json({ message: error.message });
    }
};