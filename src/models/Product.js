const { Model, DataTypes } = require("sequelize");

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        description: DataTypes.STRING,
        sku: DataTypes.STRING,
        name: DataTypes.STRING,
        price: DataTypes.FLOAT,
      },
      {
        sequelize,
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Customer, {
      foreignKey: "customer_id",
      as: "customer",
    });
    // this.hasMany(models.Customer, {
    //   foreignKey: "customer_id",
    //   as: "customer",
    // });
  }
}

module.exports = Product;
