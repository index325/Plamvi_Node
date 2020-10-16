"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var Product_1 = __importDefault(require("@modules/Products/infra/typeorm/entities/Product"));
var Cart_1 = __importDefault(require("./Cart"));
var CartItem = /** @class */ (function () {
    function CartItem() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn("uuid"),
        __metadata("design:type", String)
    ], CartItem.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], CartItem.prototype, "quantity", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], CartItem.prototype, "product_id", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return Product_1.default; }, { eager: true }),
        typeorm_1.JoinColumn({ name: "product_id" }),
        __metadata("design:type", Product_1.default)
    ], CartItem.prototype, "product", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], CartItem.prototype, "cart_id", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return Cart_1.default; }),
        typeorm_1.JoinColumn({ name: "cart_id" }),
        __metadata("design:type", Cart_1.default)
    ], CartItem.prototype, "cart", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], CartItem.prototype, "created_at", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", Date)
    ], CartItem.prototype, "updated_at", void 0);
    CartItem = __decorate([
        typeorm_1.Entity("cart_items")
    ], CartItem);
    return CartItem;
}());
exports.default = CartItem;
