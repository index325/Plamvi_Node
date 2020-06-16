module.exports = {
  up: (queryInterface, DataTypes) => {
    return Promise.all([
      queryInterface.createTable("transactions", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        transaction_id: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        status: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        authorization_code: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        tid: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        installments: {
          allowNull: false,
          type: DataTypes.INTEGER,
        },
        created_at: {
          allowNull: false,
          type: DataTypes.DATE,
        },
        updated_at: {
          allowNull: false,
          type: DataTypes.DATE,
        },
      }),
      queryInterface.createTable("orders", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        total: {
          allowNull: false,
          type: DataTypes.INTEGER,
        },
        fee: {
          allowNull: true,
          type: DataTypes.INTEGER,
        },
        days_to_deliver: {
          allowNull: true,
          type: DataTypes.INTEGER,
        },
        transaction_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: { model: "transactions", key: "id" },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        created_at: {
          allowNull: false,
          type: DataTypes.DATE,
        },
        updated_at: {
          allowNull: false,
          type: DataTypes.DATE,
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
