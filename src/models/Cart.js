const { Model, DataTypes } = require("sequelize");

class Cart extends Model {
  static init(sequelize) {
    super.init(
      {
        opened: DataTypes.BOOLEAN,
      },
      {
        sequelize,
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
    // this.hasMany(models.CartItem, {
    //   foreignKey: "cart_item_id",
    //   as: "cart_item",
    // });
    this.hasMany(models.CartItem, { foreignKey: "cart_id", as: "cart_itens" });
  }
}

module.exports = Cart;
