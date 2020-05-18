import CustomerController from "../controllers/CustomerController";
import UserController from "../controllers/UserController";

const express = require("express");
const router = express.Router();

router.get("/", function(req, res, next) {
  res.status(200).send({
    title: "Node Express API",
    version: "0.0.1",
  });
});

router.post("/cliente", CustomerController.guardar);
router.post("/usuario", UserController.guardar);

module.exports = router;
