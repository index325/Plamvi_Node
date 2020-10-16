"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateOrderTransactionFK1598047869505 = void 0;

var _typeorm = require("typeorm");

class CreateOrderTransactionFK1598047869505 {
  async up(queryRunner) {
    await queryRunner.createForeignKey("orders", new _typeorm.TableForeignKey({
      name: "OrderTransaction",
      referencedTableName: "transactions",
      referencedColumnNames: ["id"],
      columnNames: ["transaction_id"],
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey("orders", "OrderTransaction");
  }

}

exports.CreateOrderTransactionFK1598047869505 = CreateOrderTransactionFK1598047869505;