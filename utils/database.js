const mongoose = require('mongoose');
require('dotenv').config();
const env = process.env;

const connectDB = async() => {
	try {
		await mongoose.connect(env.MONGOOSE, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
	} catch(err) {
		console.error(err);
		throw new Error();
	}
};

const disconnectDB = async() => {
	try {
		await mongoose.disconnect();
	} catch(err) {
		console.error(err);
		throw new Error();
	}
}

module.exports = { connectDB, disconnectDB };