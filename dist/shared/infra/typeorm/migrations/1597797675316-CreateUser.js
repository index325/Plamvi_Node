"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUser1597797675316 = void 0;

var _typeorm = require("typeorm");

class CreateUser1597797675316 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: "users",
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
        name: "state",
        type: "varchar"
      }, {
        name: "city",
        type: "varchar"
      }, {
        name: "avatar",
        type: "varchar"
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
    await queryRunner.dropTable("users");
  }

}

exports.CreateUser1597797675316 = CreateUser1597797675316;