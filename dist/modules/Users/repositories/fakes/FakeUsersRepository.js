"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var User_1 = __importDefault(require("../../infra/typeorm/entities/User"));
var uuidv4_1 = require("uuidv4");
var UsersRepository = /** @class */ (function () {
    function UsersRepository() {
        this.users = [];
    }
    UsersRepository.prototype.findById = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                user = this.users.find(function (item) { return item.id === user_id; });
                return [2 /*return*/, user];
            });
        });
    };
    UsersRepository.prototype.findByEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                user = this.users.find(function (item) { return item.email === email; });
                return [2 /*return*/, user];
            });
        });
    };
    UsersRepository.prototype.findIfEmailAlreadyExists = function (email, id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new User_1.default()];
            });
        });
    };
    UsersRepository.prototype.update = function (_a) {
        var city = _a.city, email = _a.email, name = _a.name, state = _a.state, avatar = _a.avatar;
        return __awaiter(this, void 0, void 0, function () {
            var selectedUserIndex, selectedUser;
            return __generator(this, function (_b) {
                selectedUserIndex = this.users.findIndex(function (item) { return item.email === email; });
                selectedUser = this.users[selectedUserIndex];
                this.users[selectedUserIndex] = __assign(__assign({}, selectedUser), { city: city,
                    name: name,
                    state: state, getAvatarUrl: function () { return "fake-image-url"; } });
                if (avatar) {
                    this.users[selectedUserIndex].avatar = avatar;
                }
                return [2 /*return*/, this.users[selectedUserIndex]];
            });
        });
    };
    UsersRepository.prototype.updateUserAvatar = function (_a) {
        var user = _a.user, avatar = _a.avatar;
        return __awaiter(this, void 0, void 0, function () {
            var updatedUserList;
            return __generator(this, function (_b) {
                user.avatar = avatar;
                updatedUserList = this.users.map(function (item) {
                    if (item.email === user.email) {
                        return __assign(__assign({}, item), { avatar: user.avatar, getAvatarUrl: function () { return "fake-image-url"; } });
                    }
                    return item;
                });
                this.users = updatedUserList;
                return [2 /*return*/, user];
            });
        });
    };
    UsersRepository.prototype.create = function (_a) {
        var email = _a.email, name = _a.name, password = _a.password, state = _a.state, avatar = _a.avatar, city = _a.city;
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_b) {
                user = {
                    id: uuidv4_1.uuid(),
                    email: email,
                    name: name,
                    password: password,
                    state: state,
                    city: city,
                    avatar: "",
                    created_at: new Date(),
                    updated_at: new Date(),
                    getAvatarUrl: function () { return "fake-image-url"; },
                };
                if (avatar) {
                    user.avatar = avatar;
                }
                this.users.push(user);
                return [2 /*return*/, user];
            });
        });
    };
    UsersRepository.prototype.save = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var findIndex;
            return __generator(this, function (_a) {
                findIndex = this.users.findIndex(function (u) { return u.id === user.id; });
                this.users[findIndex] = user;
                return [2 /*return*/, user];
            });
        });
    };
    return UsersRepository;
}());
exports.default = UsersRepository;
