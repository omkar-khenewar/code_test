const express = require("express");
const path = require("path");
const apiRouter = require("./routes/api");
const middlewareRouter = require("./routes/middlewares");
const errMiddlewareRouter = require("./routes/errMiddleware");
const { MONGODB_URL, PORT } = require('./config.json');
const { API } = require('./route.config.json');

// DB connection
const mongoose = require("mongoose");
mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
	console.log(" DB Connected.")
})
.catch(err => {
	console.error("App starting error:", err.message);
	process.exit(1);
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//middleware
app.use(middlewareRouter);

//Route Prefixes
app.use(API, apiRouter);

app.all('*', function (req, res, next) {
	res.status(400).json({ status: 404, message: "Url not found" });
});

//error middleware
app.use(errMiddlewareRouter);

app.listen(PORT, () => {
    console.log('App started...', PORT);
});
