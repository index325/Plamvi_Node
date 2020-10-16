"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tsyringe_1 = require("tsyringe");
var CreateUserService_1 = __importDefault(require("@modules/Users/services/CreateUserService"));
var FindUserByIdService_1 = __importDefault(require("@modules/Users/services/FindUserByIdService"));
var UpdateUserService_1 = __importDefault(require("@modules/Users/services/UpdateUserService"));
var UpdateUserAvatarService_1 = __importDefault(require("@modules/Users/services/UpdateUserAvatarService"));
var ListAllAvailableCustomersService_1 = __importDefault(require("@modules/Users/services/ListAllAvailableCustomersService"));
var UpdatePasswordService_1 = __importDefault(require("@modules/Users/services/UpdatePasswordService"));
var class_transformer_1 = require("class-transformer");
var UsersController = /** @class */ (function () {
    function UsersController() {
    }
    UsersController.prototype.create = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, email, password, city, state, avatar, createUser, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, name = _a.name, email = _a.email, password = _a.password, city = _a.city, state = _a.state, avatar = _a.avatar;
                        createUser = tsyringe_1.container.resolve(CreateUserService_1.default);
                        return [4 /*yield*/, createUser.execute({
                                name: name,
                                email: email,
                                password: password,
                                city: city,
                                state: state,
                                avatar: avatar,
                            })];
                    case 1:
                        user = _b.sent();
                        return [2 /*return*/, response.json(class_transformer_1.classToClass(user))];
                }
            });
        });
    };
    UsersController.prototype.update = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, name, email, password, city, state, createUser, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = request.user.id;
                        _a = request.body, name = _a.name, email = _a.email, password = _a.password, city = _a.city, state = _a.state;
                        createUser = tsyringe_1.container.resolve(UpdateUserService_1.default);
                        return [4 /*yield*/, createUser.execute({
                                user_id: id,
                                name: name,
                                email: email,
                                password: password,
                                city: city,
                                state: state,
                            })];
                    case 1:
                        user = _b.sent();
                        return [2 /*return*/, response.json(class_transformer_1.classToClass(user))];
                }
            });
        });
    };
    UsersController.prototype.updateAvatar = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, createUser, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.user.id;
                        createUser = tsyringe_1.container.resolve(UpdateUserAvatarService_1.default);
                        return [4 /*yield*/, createUser.execute({
                                user_id: id,
                                avatar: request.file.filename,
                            })];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, response.json(class_transformer_1.classToClass(user))];
                }
            });
        });
    };
    UsersController.prototype.updatePassword = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, old_password, new_password, updatePassword;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = request.user.id;
                        _a = request.body, old_password = _a.old_password, new_password = _a.new_password;
                        updatePassword = tsyringe_1.container.resolve(UpdatePasswordService_1.default);
                        return [4 /*yield*/, updatePassword.execute({
                                user_id: id,
                                oldPassword: old_password,
                                newPassword: new_password,
                            })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, response.status(204).json()];
                }
            });
        });
    };
    UsersController.prototype.detail = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, createUser, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.user.id;
                        createUser = tsyringe_1.container.resolve(FindUserByIdService_1.default);
                        return [4 /*yield*/, createUser.execute(id)];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, response.json(class_transformer_1.classToClass(user))];
                }
            });
        });
    };
    UsersController.prototype.listAllAvailableCustomers = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, listAllAvailableCustomers, customers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.user.id;
                        listAllAvailableCustomers = tsyringe_1.container.resolve(ListAllAvailableCustomersService_1.default);
                        return [4 /*yield*/, listAllAvailableCustomers.execute({ id: id })];
                    case 1:
                        customers = _a.sent();
                        return [2 /*return*/, response.json(class_transformer_1.classToClass(customers))];
                }
            });
        });
    };
    return UsersController;
}());
exports.default = UsersController;
