"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProductImageUrlRename1602477281802 = void 0;

class ProductImageUrlRename1602477281802 {
  async up(queryRunner) {
    await queryRunner.renameColumn("products", "image_url", "image");
  }

  async down(queryRunner) {
    await queryRunner.renameColumn("products", "image", "image_url");
  }

}

exports.ProductImageUrlRename1602477281802 = ProductImageUrlRename1602477281802;