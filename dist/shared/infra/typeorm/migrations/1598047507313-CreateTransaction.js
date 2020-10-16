"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateTransaction1598047507313 = void 0;

var _typeorm = require("typeorm");

class CreateTransaction1598047507313 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: "transactions",
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
        name: "status",
        type: "varchar"
      }, {
        name: "authorization_code",
        type: "varchar"
      }, {
        name: "tid",
        type: "varchar"
      }, {
        name: "installments",
        type: "integer"
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
        name: "TransactionOrder",
        referencedTableName: "orders",
        referencedColumnNames: ["id"],
        columnNames: ["order_id"],
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable("transactions");
  }

}

exports.CreateTransaction1598047507313 = CreateTransaction1598047507313;