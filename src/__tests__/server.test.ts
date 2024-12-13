import { conectDB } from "../server";
import db from "../config/db";


jest.mock('../config/db')

describe('connectDB', () => {
    it('should handle database connection error', async () => {
        //spyOn.- Crea una función en el ambiente de mock, le pasa
        //la base de datos y luego el método que se quiere observar su comportamiento(obj, función)
        jest.spyOn(db, 'authenticate')
            .mockRejectedValue(new Error('Hubo un error al conectar a la BD'))
        const consoleSpy = jest.spyOn(console, 'log')

        await conectDB()
        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('Hubo un error al conectar a la BD')
        )
    })
})
