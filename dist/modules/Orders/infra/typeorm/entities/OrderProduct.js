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
var Order_1 = __importDefault(require("@modules/Orders/infra/typeorm/entities/Order"));
var OrderProduct = /** @class */ (function () {
    function OrderProduct() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn("uuid"),
        __metadata("design:type", String)
    ], OrderProduct.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], OrderProduct.prototype, "order_id", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return Order_1.default; }),
        typeorm_1.JoinColumn({ name: "order_id" }),
        __metadata("design:type", Order_1.default)
    ], OrderProduct.prototype, "order", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], OrderProduct.prototype, "product_id", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return Product_1.default; }),
        typeorm_1.JoinColumn({ name: "product_id" }),
        __metadata("design:type", Product_1.default)
    ], OrderProduct.prototype, "product", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], OrderProduct.prototype, "created_at", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", Date)
    ], OrderProduct.prototype, "updated_at", void 0);
    OrderProduct = __decorate([
        typeorm_1.Entity("order-products")
    ], OrderProduct);
    return OrderProduct;
}());
exports.default = OrderProduct;
