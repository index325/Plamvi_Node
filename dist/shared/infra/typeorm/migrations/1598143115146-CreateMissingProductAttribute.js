"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateMissingProductAttribute1598143115146 = void 0;

var _typeorm = require("typeorm");

class CreateMissingProductAttribute1598143115146 {
  async up(queryRunner) {
    await queryRunner.addColumn("products", new _typeorm.TableColumn({
      name: "name",
      type: "varchar",
      isNullable: false
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropColumn("products", "name");
  }

}

exports.CreateMissingProductAttribute1598143115146 = CreateMissingProductAttribute1598143115146;