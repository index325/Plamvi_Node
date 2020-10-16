"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tsyringe_1 = require("tsyringe");
var DiskStorageProvider_1 = __importDefault(require("./implementations/DiskStorageProvider"));
var S3StorageProvider_1 = __importDefault(require("./implementations/S3StorageProvider"));
var upload_1 = __importDefault(require("@config/upload"));
var providers = {
    disk: DiskStorageProvider_1.default,
    s3: S3StorageProvider_1.default,
};
tsyringe_1.container.registerSingleton("StorageProvider", providers[upload_1.default.driver]);
