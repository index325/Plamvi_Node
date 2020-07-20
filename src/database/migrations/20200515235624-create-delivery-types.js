module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("delivery_types", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.fn('uuid_generate_v4'),
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      customer_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "customers", key: "id" },
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
    return queryInterface.dropTable("delivery_types");
  },
};
