const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('dotenv').config();
const env = process.env;

const { connectDB,disconnectDB } = require('./utils/database');
const { HealthCheck, User } = require('./utils/schemaModels');

// データベース接続
connectDB()
	.then(() => {
		app.listen(env.PORT, () => {
			console.log(`server is running port ${env.PORT}`);
		});
	})
	.catch((err) => {
		console.error(err.message);
		process.exit(1);
	});

// データベース接続解除の処理をプロセス終了時に追加
process.on('SIGINT', () => {
	disconnectDB()
		.then(() => {
			console.log("アプリケーションを終了します");
			process.exit(0);
		});
});

const user = require('./routes/auth');
app.use('/auth', user);


const auth = require('./utils/auth');
const item = require('./routes/item');
app.use('/item', auth, item);