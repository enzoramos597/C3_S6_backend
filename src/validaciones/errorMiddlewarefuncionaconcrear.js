import { validationResult } from "express-validator";

export const validationHandler = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json( {
            status: 'error',
            message: 'La Validación fallo',
            errors: errors.array().map(error => ({
                field: error.param,
                message: error.msg
            }))
        })
    }
    next();
}