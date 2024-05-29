"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.teardown = exports.setup = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_js_1 = require("./config.js");
const logger_js_1 = require("./logger.js");
mongoose_1.default.connection.on('open', () => logger_js_1.logger.info('MongoDb Connected'));
mongoose_1.default.connection.on('disconnected', () => logger_js_1.logger.error('MongoDb Disconnected'));
const setup = async () => {
    logger_js_1.logger.debug('Connecting to DB...');
    await mongoose_1.default.connect(`mongodb+srv://${config_js_1.MONGO_USERNAME}:${config_js_1.MONGO_PASSWORD}@${config_js_1.MONGO_HOST}/${config_js_1.MONGO_DB}`);
    logger_js_1.logger.debug('Connected to DB');
};
exports.setup = setup;
const teardown = async () => {
    await mongoose_1.default.disconnect();
};
exports.teardown = teardown;
