const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EmployeeSalarySchema = new Schema({
	salary: { type: Number, required: true },
	id: { type: Number, required: true }
});

module.exports = mongoose.model("Employee_Salary", EmployeeSalarySchema);