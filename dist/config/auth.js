"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    jwt: {
        secret: process.env.APP_SECRET || "default",
        expiresIn: "1d",
    },
};
