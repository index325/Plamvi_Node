module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("cart_itens", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.fn('uuid_generate_v4'),
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      product_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "products", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      cart_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "carts", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable("cart_itens");
  },
};
