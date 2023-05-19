const express = require('express');
const app = express();
app.use(express.json());

require('dotenv').config();
const env = process.env;

app.listen(env.PORT, () => {
	console.log(`server is running port ${env.PORT}`);
});

// 健康診断の結果を表示
// 健康診断の結果を登録
// 健康診断の結果を修正
// 健康診断の結果を削除
app.get('/', (req, res) => {
	console.log("Hello");
	res.send("Hello");
});