const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const User = require("../models/User");
const Cart = require("../models/Cart");
const CartItem = require("../models/CartItem");
const Customer = require("../models/Customer");
const DeliveryType = require("../models/DeliveryType");
const Product = require("../models/Product");
const Transactions = require("../models/Transactions");
const Order = require("../models/Order");
const OrderProducts = require("../models/OrderProducts");

const connection = new Sequelize(dbConfig);

//Conexões modelos
User.init(connection);
Cart.init(connection);
CartItem.init(connection);
Customer.init(connection);
DeliveryType.init(connection);
Product.init(connection);
Transactions.init(connection);
Order.init(connection);
OrderProducts.init(connection);

// Associações
User.associate(connection.models);
Cart.associate(connection.models);
CartItem.associate(connection.models);
Customer.associate(connection.models);
DeliveryType.associate(connection.models);
Product.associate(connection.models);
Transactions.associate(connection.models);
Order.associate(connection.models);
OrderProducts.associate(connection.models);

module.exports = connection;
