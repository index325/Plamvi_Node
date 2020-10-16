"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateOrder1598045490513 = void 0;

var _typeorm = require("typeorm");

class CreateOrder1598045490513 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: "orders",
      columns: [{
        name: "id",
        type: "uuid",
        isPrimary: true,
        generationStrategy: "uuid",
        default: "uuid_generate_v4()"
      }, {
        name: "total",
        type: "float"
      }, {
        name: "fee",
        type: "float"
      }, {
        name: "days_to_deliver",
        type: "integer"
      }, {
        name: "transaction_id",
        type: "uuid"
      }, {
        name: "created_at",
        type: "timestamp",
        default: "now()"
      }, {
        name: "updated_at",
        type: "timestamp",
        default: "now()"
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable("orders");
  }

}

exports.CreateOrder1598045490513 = CreateOrder1598045490513;