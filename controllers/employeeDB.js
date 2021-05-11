const mongoose = require("mongoose");
const Employee = require("../models/employeeModel");
const EmployeeDemographics = require("../models/employeeDemographics.js")


// Get Employee List
exports.getEmployees = async(query) => {
    
    let employees = await Employee.find({}, { name: 1, designation: 1, salary: 1 }, query);
    return employees;
    
}

// Get employee information
exports.getEmployeeInfo = async(empId) => {
    let employee = await Employee.findOne({ id : parseInt(empId)}, { _id: 0});
    return employee;
}


//Get Employee count
exports.getEmployeeCount = async() => {
    let employeeCount = await Employee.count({});
    return employeeCount;
}

// Join query for Demographics and salary
exports.getEmployeeDemoGraphAndSal = async() => {
    let empData = await EmployeeDemographics.aggregate([ {$lookup: { from: "employee_salary", localField: "id", foreignField: "id", as:"sal" }},
        { $addFields: { salary: "$sal.salary" }}, { $project: { _id: 0, sal: 0 } }
    ]);
    return empData;
}