const passport = require('passport');
const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const env = process.env;

const JWTStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: env.SECRETORKEY,
}

passport.use('verify', new JWTStrategy(opts, (jwtPayload, done) => {
	const user = User.findById(jwtPayload.id);
	if (!user) { done(null, false); }
	done(null, user);
}));

const auth = async(req, res, next) => {
	const token = await req.headers.authorization;
	
	if (!token) {
		return res.status(400).json({
			message: "トークンがありません"
		});
	}
	try {
		const decoded = jwt.verify(token, env.SECRETORKEY);
		req.jwtPayload = decoded;
		return next();
	} catch(err) {
		console.error(err);
		return res.status(401).json({
			message: "トークンが不正です"
		});
	}

}

module.exports = auth