const express = require("express");
const app = express.Router();

// registering error middleware
app.use((error, req, res, next) => {
    return res.status(500).json({ error: error.toString() });
});

module.exports = app;