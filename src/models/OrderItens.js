const { Model, DataTypes } = require("sequelize");

class OrderItens extends Model {
  static init(sequelize) {
    super.init(
      {
        total: DataTypes.FLOAT,
        daysToDeliver: DataTypes.INTEGER,
      },
      {
        sequelize,
      }
    );
  }
  static associate(models) {
    
  }
}

module.exports = OrderItens;
