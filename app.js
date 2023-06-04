const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('dotenv').config();
const env = process.env;

const connectDB = require('./utils/database');
const HealthCheckup = require('./utils/schemaModels');

app.listen(env.PORT, () => {
	console.log(`server is running port ${env.PORT}`);
});

// 健康診断の結果を表示(all)
app.get('/items', async(req, res) => {
	try {
		connectDB();

		const findData = await HealthCheckup.find();
		return res.status(200).json({
			message: "データ取得成功",
			HealthData: findData
		});
	} catch {
		return res.status(400).json({message:"データ取得失敗"});
	}
});
// 特定の診断結果を表示
app.get('/item/:id', async(req, res) => {
	try {
		const findId = req.params.id;

		connectDB();
		const findData = await HealthCheckup.findById(findId);
		return res.status(200).json({
			message: "データ取得成功",
			HealthData: findData
		});
	} catch {
		return res.status(400).json({message:"データ取得失敗"});
	}
});
// 健康診断の結果を登録
app.post('/item', async(req, res) => {
	try {
		const healthData = req.body;

		connectDB();
		const createData = await HealthCheckup.create(healthData);
		return res.status(200).json({
			message: "データ登録成功",
			HealthData: createData
		});
	} catch {
		return res.status(400).json({message: "データ登録失敗"});
	}
});
// 健康診断の結果を修正
app.put('/item/:id', async(req, res) => {
	try {
		const updateId = req.params.id;
		const healthData = req.body;

		connectDB();
		const updateData = await HealthCheckup.updateOne({ _id: updateId }, { $set: healthData });
		return res.status(200).json({
			message: "データ更新成功",
			HealthData: updateData
		});
	} catch {
		return res.status(400).json({message: "データ更新失敗"});
	}
});
// 健康診断の結果を削除
app.delete('/item/:id', async(req, res) => {
	try {
		const deleteId = req.params.id;

		connectDB();
		const deleteData = await HealthCheckup.deleteOne({ _id: deleteId });
		return res.status(200).json({
			message: "データ削除成功",
			HealthData: deleteData
		});
	} catch {
		return res.status(400).json({message: "データ削除失敗"});
	}
});