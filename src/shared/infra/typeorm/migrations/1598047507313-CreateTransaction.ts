import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTransaction1598047507313 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "transactions",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "order_id",
            type: "uuid",
          },
          {
            name: "status",
            type: "varchar",
          },
          {
            name: "authorization_code",
            type: "varchar",
          },
          {
            name: "tid",
            type: "varchar",
          },
          {
            name: "installments",
            type: "integer",
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
            name: "TransactionOrder",
            referencedTableName: "orders",
            referencedColumnNames: ["id"],
            columnNames: ["order_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("transactions");
  }
}
