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
    this.belongsToMany(models.Product, { foreignKey: 'product_id', through: 'order_products', as: 'products' });
  }
}

module.exports = Product;
