const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const User = require("../models/User");
const Cart = require("../models/Cart");
const CartItem = require("../models/CartItem");
const Customer = require("../models/Customer");
const DeliveryType = require("../models/DeliveryType");
const Product = require("../models/Product");

const connection = new Sequelize(dbConfig);

User.init(connection);
Cart.init(connection);
CartItem.init(connection);
Customer.init(connection);
DeliveryType.init(connection);
Product.init(connection);

User.associate(connection.models);
Cart.associate(connection.models);
CartItem.associate(connection.models);
Customer.associate(connection.models);
DeliveryType.associate(connection.models);
Product.associate(connection.models);

module.exports = connection;
