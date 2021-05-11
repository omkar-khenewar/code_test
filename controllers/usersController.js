const UserModel = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
const util = require('util');
/**
 * Login -> getToken.
 * 
 * @returns {Object}
 */
exports.login =  async(req, res) => {

    const {userName, email, id} = req.body;

    if(!userName && !email) {
        return res.status(403).json({ status:0, message: "Username/ email Field is required to login."});
    }

    try {
        let query = userName? { userName }: { email };
        const userInfo = await UserModel.find(query);
        if(!userInfo.length) return res.status(403).json({ status:0, message: "Not a register username/ email address."});

        
        let token = await util.promisify(jwt.sign)({ user: query }, "secretkey");
        
        res.status(200).json({token});

    } catch(e){
        return res.status(403).json({ status:0, message: "Not a register username/ email address."});
    }

}