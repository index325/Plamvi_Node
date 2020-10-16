"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateOrderProduct1598045501496 = void 0;

var _typeorm = require("typeorm");

class CreateOrderProduct1598045501496 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: "order_products",
      columns: [{
        name: "id",
        type: "uuid",
        isPrimary: true,
        generationStrategy: "uuid",
        default: "uuid_generate_v4()"
      }, {
        name: "order_id",
        type: "uuid"
      }, {
        name: "product_id",
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
        name: "OrderFK",
        referencedTableName: "orders",
        referencedColumnNames: ["id"],
        columnNames: ["order_id"],
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      }, {
        name: "ProductFK",
        referencedTableName: "products",
        referencedColumnNames: ["id"],
        columnNames: ["product_id"],
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable("order_products");
  }

}

exports.CreateOrderProduct1598045501496 = CreateOrderProduct1598045501496;