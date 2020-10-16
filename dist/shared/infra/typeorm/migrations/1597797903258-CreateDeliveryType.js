"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateDeliveryType1597797903258 = void 0;

var _typeorm = require("typeorm");

class CreateDeliveryType1597797903258 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: "delivery_types",
      columns: [{
        name: "id",
        type: "uuid",
        isPrimary: true,
        generationStrategy: "uuid",
        default: "uuid_generate_v4()"
      }, {
        name: "description",
        type: "varchar",
        isNullable: false
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
        name: "CustomerDeliveryTypes",
        referencedTableName: "customers",
        referencedColumnNames: ["id"],
        columnNames: ["customer_id"],
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable("delivery_types");
  }

}

exports.CreateDeliveryType1597797903258 = CreateDeliveryType1597797903258;