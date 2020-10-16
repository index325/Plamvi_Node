"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateProduct1597798048182 = void 0;

var _typeorm = require("typeorm");

class CreateProduct1597798048182 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: "products",
      columns: [{
        name: "id",
        type: "uuid",
        isPrimary: true,
        generationStrategy: "uuid",
        default: "uuid_generate_v4()"
      }, {
        name: "price",
        type: "float",
        isNullable: false
      }, {
        name: "image_url",
        type: "varchar",
        isNullable: false
      }, {
        name: "description",
        type: "varchar",
        isNullable: false
      }, {
        name: "short_description",
        type: "varchar",
        isNullable: false
      }, {
        name: "sku",
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
        name: "CustomerProducts",
        referencedTableName: "customers",
        referencedColumnNames: ["id"],
        columnNames: ["customer_id"],
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable("products");
  }

}

exports.CreateProduct1597798048182 = CreateProduct1597798048182;