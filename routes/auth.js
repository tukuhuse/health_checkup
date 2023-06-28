const express = require('express');
const app = express();

require('dotenv').config();
const env = process.env;

app.use(express.urlencoded({ extended:true }));
app.use(express.json());

const passport = require('passport');
const passportlocal = require('passport-local');
const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');
const LocalStrategy = passportlocal.Strategy;

const { User } = require('../utils/schemaModels');

app.post('/signup', async(req, res, next) => {
	const newUser = {
		username: req.body.username,
		email: req.body.email
	}
	User.register(new User(newUser), req.body.password, (err) => {
		if (err) {
			console.error(err);
			return next(err);
		}
		return res.status(200).json({
			message: "ユーザー登録成功"
		});
	});
});

passport.use(new LocalStrategy(User.authenticate()));

app.post('/login', passport.authenticate('local', { session: false, failWithError: true }), (req, res) => {
	const user = req.user;
	const token = jwt.sign(user.id, 'secret');
	res.json({ token });
}, (err, req, res, next) => {
	if (err || !req.user) {
		console.error(err);
		res.status(401).send('Unauthorized')
	}
	else { next(err) }
});

const JWTStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: env.SECRETORKEY,
	issuer: env.ISSUER,
	audience: env.AUDIENCE
}

passport.use('verify', new JWTStrategy(opts, (jwtPayload, done) => {
	const user = User.findById(jwtPayload.id);
	if (!user) { done(null, false); }
	done(null, user);
}));

module.exports = app;