"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var multer_1 = __importDefault(require("multer"));
var path_1 = __importDefault(require("path"));
var crypto_1 = __importDefault(require("crypto"));
var tmpFolder = path_1.default.resolve(__dirname, '..', '..', 'tmp');
exports.default = {
    driver: process.env.STORAGE_PROVIDER,
    tmpFolder: tmpFolder,
    uploadsFolder: path_1.default.resolve(tmpFolder, 'uploads'),
    multer: {
        storage: multer_1.default.diskStorage({
            destination: tmpFolder,
            filename: function (request, file, callback) {
                var hash = crypto_1.default.randomBytes(10).toString('hex');
                var filename = hash + "-" + file.originalname;
                return callback(null, filename);
            },
        }),
    },
    config: {
        disk: {},
        aws: {
            bucket: 'index325-app-plamvi',
        },
    },
};
