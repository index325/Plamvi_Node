const { Model, DataTypes } = require("sequelize");

class CartItem extends Model {
  static init(sequelize) {
    super.init(
      {
        quantity: DataTypes.INTEGER,
        cart_id: DataTypes.INTEGER,
      },
      {
        sequelize,
        tableName: 'cart_itens'
      },
    );
  }
  static associate(models) {
    this.belongsTo(models.Cart, {
      foreignKey: "cart_id",
      as: "cart",
    });
    this.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
  }
}

module.exports = CartItem;
