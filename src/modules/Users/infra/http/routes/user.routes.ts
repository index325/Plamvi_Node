import { Router } from "express";

import UsersController from "../controllers/UsersController";
import ensureAuthenticated from "@modules/Users/infra/http/middlewares/ensureAuthenticated";

import multer from "multer";
import uploadConfig from "@config/upload";

const usersRouter = Router();
const usersController = new UsersController();
const upload = multer(uploadConfig.multer);

usersRouter.post("/", usersController.create);

usersRouter.put("/", ensureAuthenticated, usersController.update);

usersRouter.put(
  "/update_avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  usersController.updateAvatar
);

usersRouter.get(
  "/list_all_available_customers",
  ensureAuthenticated,
  usersController.listAllAvailableCustomers
);

export default usersRouter;
