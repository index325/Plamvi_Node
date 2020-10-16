"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateMissingCustomerAttributes1598138408754 = void 0;

var _typeorm = require("typeorm");

class CreateMissingCustomerAttributes1598138408754 {
  async up(queryRunner) {
    await queryRunner.addColumn("customers", new _typeorm.TableColumn({
      name: "avatar",
      type: "varchar",
      isNullable: true
    }));
    await queryRunner.addColumn("customers", new _typeorm.TableColumn({
      name: "city",
      type: "varchar",
      isNullable: false
    }));
    await queryRunner.addColumn("customers", new _typeorm.TableColumn({
      name: "state",
      type: "varchar",
      isNullable: false
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropColumn("customers", "avatar");
    await queryRunner.dropColumn("customers", "city");
    await queryRunner.dropColumn("customers", "state");
  }

}

exports.CreateMissingCustomerAttributes1598138408754 = CreateMissingCustomerAttributes1598138408754;