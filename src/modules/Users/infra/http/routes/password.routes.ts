import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";
import ForgotPasswordController from "../controllers/ForgotPasswordController";
import ResetPasswordController from "../controllers/ResetPasswordController";
import UsersController from "../controllers/UsersController";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();
const usersController = new UsersController();

passwordRouter.post(
  "/forgot",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string()
        .email()
        .required(),
    },
  }),
  forgotPasswordController.create
);
passwordRouter.post(
  "/reset",
  celebrate({
    [Segments.BODY]: {
      token: Joi.string()
        .uuid()
        .required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string()
        .required()
        .valid(Joi.ref("password")),
      verification_code: Joi.string().required(),
    },
  }),
  resetPasswordController.create
);

passwordRouter.put("/", ensureAuthenticated, usersController.updatePassword);

export default passwordRouter;
