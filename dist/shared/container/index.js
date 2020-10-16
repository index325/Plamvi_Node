"use strict";

var _tsyringe = require("tsyringe");

require("../../modules/Users/providers");

require("../../modules/Customers/providers");

require("./providers");

var _CartItemsRepository = _interopRequireDefault(require("../../modules/Carts/infra/typeorm/repositories/CartItemsRepository"));

var _CartsRepository = _interopRequireDefault(require("../../modules/Carts/infra/typeorm/repositories/CartsRepository"));

var _OrderRepository = _interopRequireDefault(require("../../modules/Orders/infra/typeorm/repositories/OrderRepository"));

var _OrderProductRepository = _interopRequireDefault(require("../../modules/Orders/infra/typeorm/repositories/OrderProductRepository"));

var _UsersRepository = _interopRequireDefault(require("../../modules/Users/infra/typeorm/repositories/UsersRepository"));

var _UserTokensRepository = _interopRequireDefault(require("../../modules/Users/infra/typeorm/repositories/UserTokensRepository"));

var _ProductsRepository = _interopRequireDefault(require("../../modules/Products/infra/typeorm/repositories/ProductsRepository"));

var _CustomersRepository = _interopRequireDefault(require("../../modules/Customers/infra/typeorm/repositories/CustomersRepository"));

var _CustomerTokensRepository = _interopRequireDefault(require("../../modules/Customers/infra/typeorm/repositories/CustomerTokensRepository"));

var _DeliveryTypeRepository = _interopRequireDefault(require("../../modules/DeliveryTypes/infra/typeorm/repositories/DeliveryTypeRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.registerSingleton("CartItemsRepository", _CartItemsRepository.default);

_tsyringe.container.registerSingleton("CartsRepository", _CartsRepository.default);

_tsyringe.container.registerSingleton("OrderRepository", _OrderRepository.default);

_tsyringe.container.registerSingleton("OrderProductRepository", _OrderProductRepository.default);

_tsyringe.container.registerSingleton("UsersRepository", _UsersRepository.default);

_tsyringe.container.registerSingleton("UserTokensRepository", _UserTokensRepository.default);

_tsyringe.container.registerSingleton("CustomersRepository", _CustomersRepository.default);

_tsyringe.container.registerSingleton("CustomerTokensRepository", _CustomerTokensRepository.default);

_tsyringe.container.registerSingleton("ProductsRepository", _ProductsRepository.default);

_tsyringe.container.registerSingleton("DeliveryTypeRepository", _DeliveryTypeRepository.default);