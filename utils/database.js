const mongoose = require('mongoose');
require('dotenv').config();
const env = process.env;

const connectDB = async() => {
	try {
		await mongoose.connect(env.MONGOOSE, {useNewUrlParser: true});
	} catch(err) {
		throw new Error();
	}
}

module.exports = connectDB;