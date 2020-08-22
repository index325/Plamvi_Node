import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class CreateMissingCustomerAttributes1598138408754
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "customers",
      new TableColumn({
        name: "avatar",
        type: "varchar",
        isNullable: true,
      })
    );
    await queryRunner.addColumn(
      "customers",
      new TableColumn({
        name: "city",
        type: "varchar",
        isNullable: true,
      })
    );
    await queryRunner.addColumn(
      "customers",
      new TableColumn({
        name: "state",
        type: "varchar",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("customers", "avatar");
    await queryRunner.dropColumn("customers", "city");
    await queryRunner.dropColumn("customers", "state");
  }
}
