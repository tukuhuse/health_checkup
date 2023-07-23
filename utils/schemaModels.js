const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: {
		type: String,
		required: true
	}
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

const HealthcheckupSchema = new Schema({
	userId: {
		type: String,
		required: true
	},
	consultationDate: {			//健康診断受診日
		type:Date,
		required: true
	},
	height: Number,				//身長
	weight: Number,				//体重
	girth: Number,				//腹囲
	hearingAbility: {			//聴力
		right: Boolean,
		left: Boolean
	},
	eyesight: {					//視力
		right: Number,
		left: Number
	},
	funduscopicFinding: String,	//眼底所見
	bloodPressure: {			//血圧
		high: Number,
		low: Number
	},
	funduscopicCamera: {		//眼底カメラ
		right: String,
		left: String
	},
	urinalysis: {				//尿検査
		protein: Number,		//尿蛋白
		blood: Number,			//尿潜血
		redCell: {				//赤血球
			minValue: Number,
			maxValue: Number	
		},
		whiteCell: {			//白血球
			minValue: Number,
			maxValue: Number
		},
		squamousCell: {			//扁平上皮
			minValue: Number,
			maxValue: Number
		},
		granuleCylinder: {		//顆粒円柱
			minValue: Number,
			maxValue: Number
		},
		glassCylinder: {		//硝子円柱
			minValue: Number,
			maxValue: Number
		}
	},
	ureaNitrogen: Number,		//尿素窒素
	creatinine: Number,			//クレアチニン
	eGFR: Number,
	uricAcid: Number,			//尿酸
	bloodTest: {				//血液検査
		// 白血球
		whiteCell: Number,
		basophil: Number,
		eosinophil: Number,
		neutrophil: {
			neutrophil: Number,	//好中球
			stabCell: Number,	//桿状核球
			subleafCell: Number,//分葉核球
		},
		// 赤血球
		redCell: Number,
		hemoglobin: Number,
		hematocrit: Number,
		bloodPlatelets: Number,
		serumIron: Number
	},
	cholesterol: {				//コレステロール
		total: Number,
		hdl: Number,
		nonHdl: Number,
		ldl: Number,
		neutralFal: Number
	},
	glycolysis: {				//糖代謝
		uricglygolytic: Number,
		bloodSugerFasting: Number,
		bloodSugerNormal: Number,
		hbalc: Number,
	},
	listeningClinic: String,	//問診・聴打診
	abdominalPalpation: String,	//腹部触診
	abdominalUltraSound: String,//腹部超音波検査
	//上部消化器検査
	upperGastrointestinalExamination: {
		method: String,
		result: String,
	},
	hpyloriText: {				//ピロリ菌検査
		antibody: Number,
		antibodyConcentration: Number
	},
	pepsinogen: {				//ペプシノーゲン
		part1: Number,
		part2: Number,
		ratio: Number
	},
	excrementTest: {			//便潜血検査
		test1: Boolean,
		test2: Boolean
	},
	hepaticFunction: {			//肝機能
		ureaUrobilinogen: Number,
		ast: Number,
		alt: Number,
		rGTP: Number,
		totalProtein: Number,
		bilirubin: {			//ビリルビン
			total: Number,
			direct: Number
		},
		ttt: Number,
		ztt: Number,
		alp: {
			method: Number,
			value: Number
		},
		ldh: Number,
		albumin: Number,
		aperg: Number,
		hbs: Number,
		hcv: Number
	},
	crp: Number,
	serumAmylase: Number,
	sensitivepsa: Number,
	tumorMarker: {				//腫瘍マーカー
		cea: Number,
		ca15_3: Number,
		afp: Number,
		pivka_2: Number,
		ca19_9: Number,
		dupan_2: Number,
		scc: Number,
		cyfra: Number,
		ca125: Number
	},
	gynecologicalCheckup: {		//婦人科検診
		breastExamination: {
			breastTouch: String,
			breastUltraSound: String,
			mammography: String
		},
		hysteroscopy: {			//子宮検査
			uterineDiagnosis: String,
			transvaginalUltraSound: String,
			cervicalCytology: String,
			uterineCytology: String,
			hpv: String
		}
	}
});

const HealthCheck = mongoose.model('HealthCheck', HealthcheckupSchema);

module.exports = { HealthCheck, User };