const authController = require("../controllers/AuthController");
const express = require("express");
const routes = express.Router();

routes.post("/login", authController.loginUser);
routes.post("/regiser", authController.createUser);
module.exports = routes;
