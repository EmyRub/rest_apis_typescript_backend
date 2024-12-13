"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.conectDB = conectDB;
const express_1 = __importDefault(require("express"));
const colors_1 = __importDefault(require("colors"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importStar(require("./config/swagger"));
const router_1 = __importDefault(require("./router"));
const db_1 = __importDefault(require("./config/db"));
//Conectar a base de datos
// Sequelize utiliza promises
async function conectDB() {
    try {
        /**
         * authenticate() .-Se autentica a la base de datos.
         * sync().- Agrega nuevas columnas o datos que sean nuevos
         */
        await db_1.default.authenticate();
        db_1.default.sync();
    }
    catch (error) {
        console.log(colors_1.default.red.bold('Hubo un error al conectar a la BD'));
    }
}
conectDB();
// INSTANCIA DE CORS
//.use().- Engloba todos los métodos (get,post,put,patch, delete). Funciona para no escribir post, get, etc una por una.
//Primero se la pasa la url y luego las funciones del router/handle server.use('/', router)
//Si se cambia la base, afecta a todas las url ('/base')
const server = (0, express_1.default)();
// PERMITIR CONEXIONES
const corsOptions = {
    // origen.- Quíen esta mandando la petición (front)
    //callback.- permite o restringe la llamada
    origin: function (origin, callback) {
        if (origin === process.env.FRONTEND_URL) {
            //En caso de permitir (error, si se permite la conexion)
            callback(null, true);
        }
        else {
            callback(new Error('Error de CORS'));
        }
    }
};
server.use((0, cors_1.default)(corsOptions));
//Leer datos de formularios
//Permite leer el json del body
server.use(express_1.default.json());
//Te manda datos
server.use((0, morgan_1.default)('dev'));
server.use('/api/products', router_1.default);
// Docs
server.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default, swagger_1.swaggerUiOptions));
exports.default = server;
//# sourceMappingURL=server.js.map