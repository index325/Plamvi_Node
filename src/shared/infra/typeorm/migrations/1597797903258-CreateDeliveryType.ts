import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateDeliveryType1597797903258 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "delivery_types",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "description",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "customer_id",
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
            name: "CustomerDeliveryTypes",
            referencedTableName: "customers",
            referencedColumnNames: ["id"],
            columnNames: ["customer_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("delivery_types");
  }
}
