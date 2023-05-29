const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const connectDB = require('./utils/database');
const HealthCheckup = require('./utils/schemaModels');

app.listen(env.PORT, () => {
	console.log(`server is running port ${env.PORT}`);
});

// 健康診断の結果を表示
app.get('/showall', async(req, res) => {
	connectDB();
	await HealthCheckup.find();
	console.log("success show all");
});
// 健康診断の結果を登録
// 健康診断の結果を修正
// 健康診断の結果を削除
app.get('/', async(req, res) => {
	await mongoose.connect(env.MONGOOSE);
	console.log("Hello");
	res.send("Hello");
});