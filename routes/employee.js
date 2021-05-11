var express = require("express");
const { employeeList, employeeDetail, employeeDemoGraphicsWithSalary} = require("../controllers/employeeController");

var employeeRouter = express.Router();

employeeRouter.get("/", employeeList);
employeeRouter.get("/demographicssalaryview", employeeDemoGraphicsWithSalary);
employeeRouter.get("/:id", employeeDetail);

module.exports = employeeRouter;