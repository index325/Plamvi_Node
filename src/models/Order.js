const { Model, DataTypes } = require("sequelize");

class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        total: DataTypes.INTEGER,
        daysToDeliver: DataTypes.INTEGER,
        fee: DataTypes.INTEGER,
      },
      {
        sequelize,
      }
    );
  }
  static associate(models) {
    this.hasOne(models.Transactions, { foreignKey: 'transaction_id', as: 'transaction' });
    this.belongsToMany(models.Product, { foreignKey: 'order_id', through: 'order_products', as: 'orders' });
  }
}

module.exports = Order;
