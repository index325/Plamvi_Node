"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCustomerToken1598252635897 = void 0;

var _typeorm = require("typeorm");

class CreateCustomerToken1598252635897 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: "customer_tokens",
      columns: [{
        name: "id",
        type: "uuid",
        isPrimary: true,
        generationStrategy: "uuid",
        default: "uuid_generate_v4()"
      }, {
        name: "token",
        type: "uuid",
        generationStrategy: "uuid",
        default: "uuid_generate_v4()"
      }, {
        name: "customer_id",
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
        name: "TokenCustomer",
        referencedTableName: "customers",
        referencedColumnNames: ["id"],
        columnNames: ["customer_id"],
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable("customer_tokens");
  }

}

exports.CreateCustomerToken1598252635897 = CreateCustomerToken1598252635897;