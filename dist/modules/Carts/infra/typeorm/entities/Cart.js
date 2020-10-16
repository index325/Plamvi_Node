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
var User_1 = __importDefault(require("@modules/Users/infra/typeorm/entities/User"));
var CartItem_1 = __importDefault(require("./CartItem"));
var Customer_1 = __importDefault(require("@modules/Customers/infra/typeorm/entities/Customer"));
var class_transformer_1 = require("class-transformer");
var Cart = /** @class */ (function () {
    function Cart() {
    }
    Cart.prototype.getTotal = function () {
        if (this.cart_item) {
            var total_1 = 0;
            this.cart_item.map(function (item) {
                total_1 += item.quantity * item.product.price;
            });
            return total_1;
        }
        else {
            return 0;
        }
    };
    __decorate([
        typeorm_1.PrimaryGeneratedColumn("uuid"),
        __metadata("design:type", String)
    ], Cart.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Boolean)
    ], Cart.prototype, "opened", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Cart.prototype, "user_id", void 0);
    __decorate([
        typeorm_1.OneToOne(function () { return User_1.default; }),
        typeorm_1.JoinColumn({ name: "user_id" }),
        __metadata("design:type", User_1.default)
    ], Cart.prototype, "user", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return CartItem_1.default; }, function (cart_item) { return cart_item.cart; }, { eager: true }),
        __metadata("design:type", Array)
    ], Cart.prototype, "cart_item", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Cart.prototype, "customer_id", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return Customer_1.default; }, { eager: true }),
        typeorm_1.JoinColumn({ name: "customer_id" }),
        __metadata("design:type", Customer_1.default)
    ], Cart.prototype, "customer", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Cart.prototype, "created_at", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", Date)
    ], Cart.prototype, "updated_at", void 0);
    __decorate([
        class_transformer_1.Expose({ name: "total" }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Number)
    ], Cart.prototype, "getTotal", null);
    Cart = __decorate([
        typeorm_1.Entity("carts")
    ], Cart);
    return Cart;
}());
exports.default = Cart;
