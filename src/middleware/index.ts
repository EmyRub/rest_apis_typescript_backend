import { Request, Response, NextFunction } from "express"
import { validationResult } from "express-validator";

export const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {

    //Recupera los mensajes de error
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
        return
    }

    //Pasa a la siguiente función
    next()
}