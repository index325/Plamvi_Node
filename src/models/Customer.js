const { Model, DataTypes } = require("sequelize");

class Customer extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        paid: DataTypes.BOOLEAN,
      },
      {
        sequelize,
      }
    );
  }
  static associate(models) {
    // this.hasMany(models.Cart, {
    //   foreignKey: "cart_id",
    //   as: "cart",
    // });
    // this.hasMany(models.Product, {
    //   foreignKey: "product_id",
    //   as: "product",
    // });
  }
}

module.exports = Customer;
