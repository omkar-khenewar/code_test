
const express = require("express");
const app = express.Router();
const { verifyToken } = require("./auth.js");
const jwt = require("jsonwebtoken");

app.use(verifyToken); //Registering auth middleware
app.use((req, res, next) => {
    
    if(req.path == "/api/users/login") next();
    else{
        //verifying token with jwt secret
        jwt.verify(req.token, "secretkey", (err, authData) => {
            if (err) {
              return  res.status(403).json("Authorization failed");
            }
            next();
        })
    }
})


module.exports = app;