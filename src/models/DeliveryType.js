const { Model, DataTypes } = require('sequelize');

class DeliveryType extends Model {
  static init(sequelize) {
    super.init({
      description: DataTypes.STRING,
    }, {
      sequelize
    })
  }
  static associate(models) {
    this.belongsTo(models.Customer, { foreignKey: 'customer_id', as: 'customer' });
  }
}

module.exports = DeliveryType;