"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpecification = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const config_1 = __importDefault(require("./config"));
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Taxi',
            version: '1.0.0',
        },
        servers: [
            {
                url: `http://localhost:${config_1.default.port}`,
                description: 'Taxi Rides API',
            },
        ],
    },
    apis: [
        './src/app.js',
        './src/schemas.js',
        './src/routes/health.js',
        './src/routes/rides.js',
    ],
};
exports.swaggerSpecification = (0, swagger_jsdoc_1.default)(options);
//# sourceMappingURL=swagger.js.map