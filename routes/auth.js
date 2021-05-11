const express = require("express");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel.js");

let router = express.Router();

//verify token mid
exports.verifyToken = (req, res,next) => {

    // check for login
    if(req.path == "/api/users/login")  next();
    else {
        const bearerHeader = req.headers["authorization"];
        
        if(bearerHeader || (typeof bearerHeader != "undefined") ){
            const [bearer, bearerToken] = bearerHeader.split(' ');
            if(bearer != 'Bearer') return res.status(403).json({ status: 0, message: "Bearer authorization header required ." });
            req.token = bearerToken;
            next();
        }
        else res.status(403).json({ status: 0, message: "authorization header missing ." });
    }
}



