"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var UsersController_1 = __importDefault(require("../controllers/UsersController"));
var ensureAuthenticated_1 = __importDefault(require("@modules/Users/infra/http/middlewares/ensureAuthenticated"));
var multer_1 = __importDefault(require("multer"));
var upload_1 = __importDefault(require("@config/upload"));
var usersRouter = express_1.Router();
var usersController = new UsersController_1.default();
var upload = multer_1.default(upload_1.default.multer);
usersRouter.post("/", usersController.create);
usersRouter.put("/", ensureAuthenticated_1.default, usersController.update);
usersRouter.get("/", ensureAuthenticated_1.default, usersController.detail);
usersRouter.put("/update_avatar", ensureAuthenticated_1.default, upload.single("avatar"), usersController.updateAvatar);
usersRouter.get("/list_all_available_customers", ensureAuthenticated_1.default, usersController.listAllAvailableCustomers);
exports.default = usersRouter;
