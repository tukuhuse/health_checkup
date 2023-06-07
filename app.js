const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('dotenv').config();
const env = process.env;

const { connectDB,disconnectDB } = require('./utils/database');
const HealthCheckup = require('./utils/schemaModels');

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

// 健康診断の結果を表示(all)
app.get('/items', async(req, res) => {
	try {
		const findData = await HealthCheckup.find();
		return res.status(200).json({
			message: "データ取得成功",
			HealthData: findData
		});
	} catch(err) {
		console.error(err.message);
		return res.status(400).json({message:"データ取得失敗"});
	}
});
// 健康診断の結果を登録
app.post('/item', async(req, res) => {
	try {
		const createData = await HealthCheckup.create(req.body);
		return res.status(200).json({
			message: "データ登録成功",
			HealthData: createData
		});
	} catch(err) {
		console.error(err.message);
		return res.status(400).json({message: "データ登録失敗"});
	}
});

// 健康診断の結果を表示、更新、削除
app.route('/item/:id')
	.get(async(req, res) => {
		try {
			const findData = await HealthCheckup.findById(req.params.id);
			return res.status(200).json({
				message: "データ取得成功",
				HealthData: findData
			});
		} catch(err) {
			console.error(err.message);
		}
	})
	.put(async(req, res) => {
		try {
			const updateData = await HealthCheckup.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
			return res.status(200).json({
				message: "データ更新成功",
				HealthData: updateData
			});
		} catch(err) {
			console.error(err.message);
		}
	})
	.delete(async(req, res) => {
		try {
			const deleteData = await HealthCheckup.findByIdAndDelete(req.params.id);
			return res.status(200).json({
				message: "データ削除完了",
				HealthData: deleteData
			});
		} catch(err) {
			console.error(err.message);
		}
	})