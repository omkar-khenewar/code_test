const { Mongoose } = require('mongoose');
const { getEmployees, getEmployeeInfo, getEmployeeCount, getEmployeeDemoGraphAndSal } =  require('./employeeDB.js');


/**
 * Employee List.
 * 
 * @returns {Object}
 */
exports.employeeList =  (req, res) => {

	let query = {};
	if(req.query.size || req.query.pageNo)
	{
		let pageNo = req.query.pageNo? parseInt(req.query.pageNo): 1;
		let size = req.query.size? parseInt(req.query.size): 25;

		const errMsg = pageNo < 0? "Invalid page number": (size < 0)? "Invalid page size": '';

		if(errMsg)
		{
			return res.json({
				status: 0,
				message: errMsg,
			});
		}

		query = {
			skip: size * (pageNo - 1),
			limit: size
		}
	}

	let successResp = {status: 1};
	return getEmployeeCount()
	.then(count => {
		successResp.totalCount = count;
		return getEmployees(query);
	})
	.then((employees) => {
		if(!employees){
			return res.status(200).json({
				status: 1,
			    message: "No employess found"
			})
		}
		successResp.employees = employees.map((emp) => emp.toObject());
		successResp.count = employees.length;
		return res.status(200).json(successResp);
	})
	.catch((e) => {
		console.log(e.message);
		res.status(500).json({
					status: 0,
			    	message: "Something went wrong, Please contact Administrator"
		});
	})
        
    
}



/**
 * Employee Detail.
 * 
 * @param {string}      id
 * 
 * @returns {Object}
 */
exports.employeeDetail = async(req, res) => {

    const {id} = req.params;
    if(!id) {
        return res.status(400).json({ status:0, message: "Employee Id field is required." })
    }

    try {
        const employee = await getEmployeeInfo(id);
		if(!employee) { return res.status(200). json({ status: 1, message: `No employes found with id: ${id}` }) }

        return res.json(employee.toObject());
    } catch(err) {
        return res.status(500).json({ status:0, message: "Something went wrong, Please contact Administrator" });
    }
};


/**
 * Employee Demographics and salary.
 * 
 * 
 * 
 * @returns {Object}
 */

 exports.employeeDemoGraphicsWithSalary = async(req, res) => {

    try {
        let employeesData = await getEmployeeDemoGraphAndSal();
		if(!employeesData) { return res.status(200). json({ status: 1, message: `No employee data found` }) }
		let successResp = {status: 1};
		// successResp.employees = employeesData.map((emp) => emp.toObject());
		successResp.employees = employeesData
		successResp.count = employeesData.length;

        return res.json(successResp);
    } catch(err) {
        return res.status(500).json({ status:0, message: "Something went wrong, Please contact Administrator111" });
    }
};


