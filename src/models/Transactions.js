const { Model, DataTypes } = require("sequelize");

class Transactions extends Model {
  static init(sequelize) {
    super.init(
      {
        transaction_id: DataTypes.STRING,
        status: DataTypes.STRING,
        authorization_code: DataTypes.STRING,
        tid: DataTypes.STRING,
        installments: DataTypes.INTEGER,
      },
      {
        sequelize,
      }
    );
  }
  static associate(models) {
    this.hasOne(models.Order, { foreignKey: 'order_id', as: 'order' });
  }
}

module.exports = Transactions;
