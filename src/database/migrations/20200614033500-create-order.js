module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.createTable("transactions", {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.fn('uuid_generate_v4'),
        },
        transaction_id: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        status: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        authorization_code: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        tid: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        installments: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      }),
      queryInterface.createTable("orders", {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.fn('uuid_generate_v4'),
        },
        total: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        fee: {
          allowNull: true,
          type: Sequelize.INTEGER,
        },
        days_to_deliver: {
          allowNull: true,
          type: Sequelize.INTEGER,
        },
        transaction_id: {
          type: Sequelize.UUID,
          allowNull: true,
          references: { model: "transactions", key: "id" },
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
      })
    ])
  },

  down: (queryInterface) => {
    return Promise.all([
      queryInterface.dropTable("orders"),
      queryInterface.dropTable("transactions"),
    ]);
  },
};
