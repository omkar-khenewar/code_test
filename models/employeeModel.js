const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
	name: { type: String, required: true },
	id: { type: Number, required: true },
	salary: { type: Number, required: true },
	designation: { type: String, required: true },
	bloodGroup: { type: String, required: true }
});

module.exports = mongoose.model("Employee", EmployeeSchema);