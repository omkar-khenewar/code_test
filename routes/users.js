const express = require("express");
const { login } = require("../controllers/usersController");

const userRouter = express.Router();
userRouter.post("/login", login);

module.exports = userRouter;