"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCustomer1597797787664 = void 0;

var _typeorm = require("typeorm");

class CreateCustomer1597797787664 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: "customers",
      columns: [{
        name: "id",
        type: "uuid",
        isPrimary: true,
        generationStrategy: "uuid",
        default: "uuid_generate_v4()"
      }, {
        name: "name",
        type: "varchar"
      }, {
        name: "email",
        type: "varchar",
        isUnique: true
      }, {
        name: "password",
        type: "varchar"
      }, {
        name: "paid",
        type: "boolean"
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
    await queryRunner.dropTable("customers");
  }

}

exports.CreateCustomer1597797787664 = CreateCustomer1597797787664;