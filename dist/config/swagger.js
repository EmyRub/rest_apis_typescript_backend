"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerUiOptions = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
    swaggerDefinition: {
        openapi: '3.0.2',
        tags: [
            {
                name: 'Products',
                description: 'API operation related to products'
            }
        ],
        info: {
            title: 'REST API Node.js / Express / TypeScript',
            version: "1.0.0",
            description: 'API Docs for Products'
        }
    },
    apis: ['./src/router.ts']
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
const swaggerUiOptions = {
    customCss: `
        .topbar-wrapper .link {
            content: url('https://images.vexels.com/media/users/3/155385/isolated/preview/9460c347d8a489b2549ef5ca4757d2df-smiley-kawaii-face-sushi-icon.png');
            height: 115px;
            width: 100px;
    }
    .swagger-ui .topbar a {
        max-width: 130px;
    }
    .swagger-ui .topbar {
        background-color: #5d4265;
    }        
    `,
    customSiteTitle: 'Documentación REST API Express / TypeScript'
};
exports.swaggerUiOptions = swaggerUiOptions;
exports.default = swaggerSpec;
//# sourceMappingURL=swagger.js.map