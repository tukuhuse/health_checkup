const mongoose = require('mongoose');
require('dotenv').config();
const env = process.env;

const connectDB = async() => {
	try {
		await mongoose.connect(env.MONGOOSE, {useNewUrlParser: true});
		console.log("Success: Connected to MongoDB");
	} catch(err) {
		console.log("Failure: UnConnected to MongoDB");
		throw new Error();
	}
}

module.exports = connectDB;