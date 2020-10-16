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
var uuidv4_1 = require("uuidv4");
var Customer_1 = __importDefault(require("../../infra/typeorm/entities/Customer"));
var FakeCustomersRepository = /** @class */ (function () {
    function FakeCustomersRepository() {
        this.customers = [];
    }
    FakeCustomersRepository.prototype.create = function (_a) {
        var name = _a.name, email = _a.email, password = _a.password, avatar = _a.avatar, city = _a.city, state = _a.state, paid = _a.paid;
        return __awaiter(this, void 0, void 0, function () {
            var customer;
            return __generator(this, function (_b) {
                customer = new Customer_1.default();
                customer.id = uuidv4_1.uuid();
                customer.name = name;
                customer.email = email;
                customer.password = password;
                customer.avatar = avatar;
                customer.city = city;
                customer.state = state;
                customer.paid = paid;
                this.customers.push(customer);
                return [2 /*return*/, customer];
            });
        });
    };
    FakeCustomersRepository.prototype.update = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Customer_1.default()];
            });
        });
    };
    FakeCustomersRepository.prototype.findByEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var foundCustomer;
            return __generator(this, function (_a) {
                foundCustomer = this.customers.find(function (item) { return item.email === email; });
                return [2 /*return*/, foundCustomer];
            });
        });
    };
    FakeCustomersRepository.prototype.findById = function (customer_id) {
        return __awaiter(this, void 0, void 0, function () {
            var foundCustomer;
            return __generator(this, function (_a) {
                foundCustomer = this.customers.find(function (item) { return item.id === customer_id; });
                return [2 /*return*/, foundCustomer];
            });
        });
    };
    FakeCustomersRepository.prototype.listAllAvailableCustomersByCityAndState = function (city, state) {
        return __awaiter(this, void 0, void 0, function () {
            var foundCustomer;
            return __generator(this, function (_a) {
                foundCustomer = this.customers.filter(function (item) { return item.city === city && item.state === state; });
                return [2 /*return*/, foundCustomer];
            });
        });
    };
    FakeCustomersRepository.prototype.save = function (customer) {
        return __awaiter(this, void 0, void 0, function () {
            var findIndex;
            return __generator(this, function (_a) {
                findIndex = this.customers.findIndex(function (c) { return c.id === customer.id; });
                this.customers[findIndex] = customer;
                return [2 /*return*/, customer];
            });
        });
    };
    return FakeCustomersRepository;
}());
exports.default = FakeCustomersRepository;
