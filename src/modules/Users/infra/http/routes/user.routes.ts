import { Router } from "express";

import UsersController from "../controllers/UsersController";
import ensureAuthenticated from "@modules/Users/infra/http/middlewares/ensureAuthenticated";

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post("/", usersController.create);
usersRouter.put("/", ensureAuthenticated, usersController.update);
usersRouter.put(
  "/update_avatar/:user_id",
  ensureAuthenticated,
  usersController.updateAvatar
);

export default usersRouter;
