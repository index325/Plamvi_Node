import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class CreateOrderTransactionFK1598047869505
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      "orders",
      new TableForeignKey({
        name: "OrderTransaction",
        referencedTableName: "transactions",
        referencedColumnNames: ["id"],
        columnNames: ["transaction_id"],
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("orders", "OrderTransaction");
  }
}
