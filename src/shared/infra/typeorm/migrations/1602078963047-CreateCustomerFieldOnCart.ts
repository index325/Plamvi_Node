import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class CreateCustomerFieldOnCart1602078963047
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "carts",
      new TableColumn({
        name: "customer_id",
        type: "uuid",
        isNullable: false,
      })
    );
    await queryRunner.createForeignKey(
      "carts",
      new TableForeignKey({
        name: "CartCustomer",
        referencedTableName: "customers",
        referencedColumnNames: ["id"],
        columnNames: ["customer_id"],
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("carts", "CartCustomer");
    await queryRunner.dropColumn("carts", "customer_id");
  }
}
