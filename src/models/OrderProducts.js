const { Model, DataTypes } = require("sequelize");

class OrderProducts extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        sequelize,
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Order, {
      foreignKey: "order_id",
      as: "order",
    });
    this.belongsTo(models.Product, {
      foreignKey: "product_id",
      as: "products",
    });
  }
}

module.exports = OrderProducts;
