import { Router } from "express";
import cartsRouter from "@modules/Carts/infra/http/routes/cart.routes";
import customerRouter from "@modules/Customers/infra/http/routes/customer.routes";
import customerSessionRouter from "@modules/Customers/infra/http/routes/sessions.routes";
// import deliveryRouter from "@modules/DeliveryTypes/infra/http/routes/delivery.routes";
import ordersRouter from "@modules/Orders/infra/http/routes/order.routes";
import orderProductsRouter from "@modules/Orders/infra/http/routes/orderProducts.routes";
import productsRouter from "@modules/Products/infra/http/routes/products.routes";
// import transactionsRouter from "@modules/Transactions/infra/http/routes/transactions.routes";
import usersRouter from "@modules/Users/infra/http/routes/user.routes";
import usersSessionRouter from "@modules/Users/infra/http/routes/sessions.routes";

const routes = Router();

routes.use("/carts", cartsRouter);
routes.use("/customers", customerRouter);
routes.use("/customers/sessions", customerSessionRouter);
routes.use("/orders", ordersRouter);
routes.use("/orders/products", orderProductsRouter);
routes.use("/products", productsRouter);
routes.use("/users", usersRouter);
routes.use("/users/sessions", usersSessionRouter);

export default routes;
