import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCartItem1598044914052 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "cart_items",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "quantity",
            type: "integer",
          },
          {
            name: "product_id",
            type: "uuid",
          },
          {
            name: "cart_id",
            type: "uuid",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "CartItemProduct",
            referencedTableName: "products",
            referencedColumnNames: ["id"],
            columnNames: ["product_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "CartItemCart",
            referencedTableName: "carts",
            referencedColumnNames: ["id"],
            columnNames: ["cart_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("cart_items");
  }
}
