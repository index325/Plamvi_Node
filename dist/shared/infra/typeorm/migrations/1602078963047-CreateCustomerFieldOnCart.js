"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCustomerFieldOnCart1602078963047 = void 0;

var _typeorm = require("typeorm");

class CreateCustomerFieldOnCart1602078963047 {
  async up(queryRunner) {
    await queryRunner.addColumn("carts", new _typeorm.TableColumn({
      name: "customer_id",
      type: "uuid",
      isNullable: false
    }));
    await queryRunner.createForeignKey("carts", new _typeorm.TableForeignKey({
      name: "CartCustomer",
      referencedTableName: "customers",
      referencedColumnNames: ["id"],
      columnNames: ["customer_id"],
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey("carts", "CartCustomer");
    await queryRunner.dropColumn("carts", "customer_id");
  }

}

exports.CreateCustomerFieldOnCart1602078963047 = CreateCustomerFieldOnCart1602078963047;