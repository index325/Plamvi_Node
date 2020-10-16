"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCart1598044672174 = void 0;

var _typeorm = require("typeorm");

class CreateCart1598044672174 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: "carts",
      columns: [{
        name: "id",
        type: "uuid",
        isPrimary: true,
        generationStrategy: "uuid",
        default: "uuid_generate_v4()"
      }, {
        name: "opened",
        type: "boolean"
      }, {
        name: "user_id",
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
        name: "UserCart",
        referencedTableName: "users",
        referencedColumnNames: ["id"],
        columnNames: ["user_id"],
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable("carts");
  }

}

exports.CreateCart1598044672174 = CreateCart1598044672174;