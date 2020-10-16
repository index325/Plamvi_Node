"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ProductsController_1 = __importDefault(require("../controllers/ProductsController"));
var ensureAuthenticated_1 = __importDefault(require("@modules/Users/infra/http/middlewares/ensureAuthenticated"));
var ensureAuthenticated_2 = __importDefault(require("@modules/Customers/infra/http/middlewares/ensureAuthenticated"));
var multer_1 = __importDefault(require("multer"));
var upload_1 = __importDefault(require("@config/upload"));
var productsRouter = express_1.Router();
var productsController = new ProductsController_1.default();
var uploadMiddleware = multer_1.default(upload_1.default.multer);
productsRouter.post("/", ensureAuthenticated_2.default, uploadMiddleware.single("image"), productsController.create);
productsRouter.put("/:product_id", ensureAuthenticated_2.default, productsController.update);
productsRouter.get("/detail/:product_id", ensureAuthenticated_2.default, productsController.detail);
productsRouter.get("/list_by_customer/:customer_id", ensureAuthenticated_1.default, productsController.listByCustomerId);
exports.default = productsRouter;
