"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect = jest.fn();
const TEST_MONGO_HOST = 'test_host';
const TEST_MONGO_USERNAME = 'test_user';
const TEST_MONGO_PASSWORD = 'test_pw';
process.env.MONGO_HOST = TEST_MONGO_HOST;
process.env.MONGO_USERNAME = TEST_MONGO_USERNAME;
process.env.MONGO_PASSWORD = TEST_MONGO_PASSWORD;
// a
const { setup } = await import('./setup.js');
describe('setup', () => {
    it('should call mongoose.connect on setup', async () => {
        await setup();
        expect(mongoose_1.default.connect).toHaveBeenCalledWith(`mongodb://${TEST_MONGO_USERNAME}:${TEST_MONGO_PASSWORD}@${TEST_MONGO_HOST}/`);
    });
});
