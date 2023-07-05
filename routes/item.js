const express = require('express');
const app = express();
const router = express.Router();

require('dotenv').config();
const env = process.env;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const { HealthCheck } = require('../utils/schemaModels');
const auth = require('../utils/auth');

// ユーザーの全年度の診断結果にアクセス
router.get('/all', auth, async(req, res) => {
	try {
		const findData = await HealthCheck.find({ userId: req.jwtPayload.id });
		return res.status(200).json({
			message: "データ取得成功",
			HealthData: findData
		});
	} catch(err) {
		console.error(err);
		return res.status(400).json({message:"データ取得失敗"});
	}
});

// 各年度毎の診断結果にアクセス
router.route('/', auth)
	.all(async(req, res, next) => {
		const payloadUserId = req.jwtPayload.id;
		if (payloadUserId !== req.body.userId) {
			return res.status(400).json({
				message: "不正アクセスです"
			});
		}
		next();
	})
	.post(async(req, res) => {
		try {
			const createData = await HealthCheck.create(req.body);
			return res.status(200).json({
				message: "データ登録成功",
				HealthData: createData
			});
		} catch(err) {
			console.error(err.message);
			return res.status(400).json({
				message: "データ登録失敗"
			});
		}
	})
	.get(async(req, res) => {
		try {
			const findData = await HealthCheck.findById(req.body.id);
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
			const updateData = await HealthCheck.findByIdAndUpdate(req.body.id, { $set: req.body }, { new: true });
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
			const deleteData = await HealthCheck.findByIdAndDelete(req.body.id);
			return res.status(200).json({
				message: "データ削除完了",
				HealthData: deleteData
			});
		} catch(err) {
			console.error(err);
		}
	});

module.exports = router;