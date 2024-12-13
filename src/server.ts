import express from "express";
import colors from 'colors';
import cors, { CorsOptions } from "cors";
import morgan from 'morgan'
import swaggerUi from "swagger-ui-express";
import swaggerSpec, { swaggerUiOptions } from "./config/swagger";
import router from "./router";
import db from "./config/db";


//Conectar a base de datos
// Sequelize utiliza promises
export async function conectDB() {
    try {
        /**
         * authenticate() .-Se autentica a la base de datos.
         * sync().- Agrega nuevas columnas o datos que sean nuevos
         */
        await db.authenticate()
        db.sync()
    } catch (error) {
        console.log(colors.red.bold('Hubo un error al conectar a la BD'))
    }
}

conectDB()

// INSTANCIA DE CORS
//.use().- Engloba todos los métodos (get,post,put,patch, delete). Funciona para no escribir post, get, etc una por una.
//Primero se la pasa la url y luego las funciones del router/handle server.use('/', router)
//Si se cambia la base, afecta a todas las url ('/base')
const server = express()

// PERMITIR CONEXIONES
const corsOptions: CorsOptions = {
    // origen.- Quíen esta mandando la petición (front)
    //callback.- permite o restringe la llamada
    origin: function (origin, callback) {
        if (origin === process.env.FRONTEND_URL) {
            //En caso de permitir (error, si se permite la conexion)
            callback(null, true)
        } else {
            callback(new Error('Error de CORS'))
        }
    }
}
server.use(cors(corsOptions))

//Leer datos de formularios
//Permite leer el json del body
server.use(express.json())

//Te manda datos
server.use(morgan('dev'))
server.use('/api/products', router)

// Docs
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions))

export default server