"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCartItem1598044914052 = void 0;

var _typeorm = require("typeorm");

class CreateCartItem1598044914052 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: "cart_items",
      columns: [{
        name: "id",
        type: "uuid",
        isPrimary: true,
        generationStrategy: "uuid",
        default: "uuid_generate_v4()"
      }, {
        name: "quantity",
        type: "integer"
      }, {
        name: "product_id",
        type: "uuid"
      }, {
        name: "cart_id",
        type: "uuid"
      }, {
        name: "created_at",
        type: "timestamp",
        default: "now()"
      }, {
        name: "updated_at",
        type: "timestamp",
        default: "now()"
      }],
      foreignKeys: [{
        name: "CartItemProduct",
        referencedTableName: "products",
        referencedColumnNames: ["id"],
        columnNames: ["product_id"],
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      }, {
        name: "CartItemCart",
        referencedTableName: "carts",
        referencedColumnNames: ["id"],
        columnNames: ["cart_id"],
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable("cart_items");
  }

}

exports.CreateCartItem1598044914052 = CreateCartItem1598044914052;