module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      sku: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      price: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'customers', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('products');
  }
};