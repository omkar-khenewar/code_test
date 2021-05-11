const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EmployeeDemographics = new Schema({
	age: { type: Number, required: true },
	id: { type: Number, required: true },
	salary: { type: Number, required: true },
	gender: { type: String, required: true },
	citizenShip: { type: String, required: true },
    isMarried: { type: Boolean, required: true },
});

module.exports = mongoose.model("Employee_Demographics", EmployeeDemographics);