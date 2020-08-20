import { Router } from "express";

import UsersController from "../controllers/UsersController";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post("/", usersController.create);
usersRouter.put("/", ensureAuthenticated, usersController.update);
usersRouter.put(
  "/update_avatar/:user_id",
  ensureAuthenticated,
  usersController.updateAvatar
);
usersRouter.get("/detail/:user_id", usersController.findById);
// usersRouter.get("/detail/:user_id", usersController.findById);

export default usersRouter;
