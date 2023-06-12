const express = require('express');
const app = express();
const bcrypt = require('bcrypt');

require('dotenv').config();
const env = process.env;

app.use(express.urlencoded({ extended:true }));
app.use(express.json());

const { User } = require('../utils/schemaModels');

app.post('/signup', async(req, res) => {
	try {
		const hashpassword = await bcrypt.hashSync(req.body.password, Number(env.SALTROUNDS));
		const newUser = await User.create({
			email: req.body.email,
			password: hashpassword
		});
		return res.status(200).json({
			message: "ユーザー登録完了",
			user: newUser
		});
	} catch(err) {
		console.error(err);
	}
});

app.post('/login', async(req, res) => {
	try {
		const email = req.body.email;

		const findUser = await User.findOne({ email: email});
		if (findUser == null) {
			return res.status(400).json({
				message: "メールアドレスが違います"
			});
		}

		const passwordCheck = bcrypt.compareSync(req.body.password, findUser.password);
		if (!passwordCheck) {
			return res.status(400).json({
				message: "パスワードが違います"
			});
		}

		return res.status(200).json({
			message: "ログイン成功"
		});

	} catch(err) {
		console.error(err);
	}
});

module.exports = app;