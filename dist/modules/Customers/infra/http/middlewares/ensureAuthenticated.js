"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = require("jsonwebtoken");

var _auth = _interopRequireDefault(require("../../../../../config/auth"));

var _AppError = _interopRequireDefault(require("../../../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = async (request, response, next) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new _AppError.default("JWT token is missing", 401);
  }

  const {
    secret
  } = _auth.default.jwt;
  const [, token] = authHeader.split(" ");

  try {
    const decoded = (0, _jsonwebtoken.verify)(token, secret);
    const {
      sub
    } = decoded;
    request.customer = {
      id: sub
    };
    return next();
  } catch (error) {
    throw new _AppError.default("Invalid JWT token", 401);
  }
};

exports.default = _default;