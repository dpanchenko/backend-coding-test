"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const routes_1 = require("./routes");
const logger_1 = require("./logger");
const swagger_1 = require("./swagger");
exports.app = (0, express_1.default)();
exports.app.use(logger_1.expressLogger);
exports.app.use(body_parser_1.default.json());
exports.app.use(routes_1.healthRouter);
exports.app.use(routes_1.ridesRouter);
exports.app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpecification));
//# sourceMappingURL=app.js.map