import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class CreateRecoveryCode1602913046463 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "user_tokens",
      new TableColumn({
        name: "recovery_code",
        type: "varchar",
        isNullable: false,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("user_tokens", "recovery_code");
  }
}
