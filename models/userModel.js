const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: { type: String, required: true },
	id: { type: Number, required: true },
	email: { type: String, required: true },
    userName: { type: String, required: true }
});

module.exports = mongoose.model("Users", UserSchema);