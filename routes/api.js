const express = require("express");
const userRouter = require("./users.js");
const employeeRouter = require("./employee.js");
const app = express.Router();

const { EMPLOYEES, USERS } = require('../route.config.json');

app.use(USERS, userRouter);
app.use(EMPLOYEES, employeeRouter);

module.exports = app;