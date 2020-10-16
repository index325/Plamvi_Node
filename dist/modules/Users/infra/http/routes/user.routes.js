"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _UsersController = _interopRequireDefault(require("../controllers/UsersController"));

var _ensureAuthenticated = _interopRequireDefault(require("../middlewares/ensureAuthenticated"));

var _multer = _interopRequireDefault(require("multer"));

var _upload = _interopRequireDefault(require("../../../../../config/upload"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const usersRouter = (0, _express.Router)();
const usersController = new _UsersController.default();
const upload = (0, _multer.default)(_upload.default.multer);
usersRouter.post("/", usersController.create);
usersRouter.put("/", _ensureAuthenticated.default, usersController.update);
usersRouter.get("/", _ensureAuthenticated.default, usersController.detail);
usersRouter.put("/update_avatar", _ensureAuthenticated.default, upload.single("avatar"), usersController.updateAvatar);
usersRouter.get("/list_all_available_customers", _ensureAuthenticated.default, usersController.listAllAvailableCustomers);
var _default = usersRouter;
exports.default = _default;