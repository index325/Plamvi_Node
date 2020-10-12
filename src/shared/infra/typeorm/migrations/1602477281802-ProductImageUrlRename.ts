import { MigrationInterface, QueryRunner } from "typeorm";

export class ProductImageUrlRename1602477281802 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn("products", "image_url", "image");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn("products", "image", "image_url");
  }
}
