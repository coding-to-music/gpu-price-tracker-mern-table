const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt');

const cookieExtractor = (req) => {
	let token = null;
	if (req && req.cookies) {
		token = req.cookies['access_token'];
	}
	return token;
};

passport.use(
	new JWTstrategy(
		{
			secretOrKey: 'test',
			jwtFromRequest: cookieExtractor,
		},
		async (payload, done) => {
			const username = payload.user.username;
			User.findOne({ username }, (err, user) => {
				if (err) return done(err, false);
				if (user) return done(null, user);
				else return done(null, false);
			});
		}
	)
);

passport.use(
	'login',
	new LocalStrategy(
		{
			usernameField: 'username',
			passwordField: 'password',
		},
		async (username, password, done) => {
			try {
				const user = await User.findOne({ username });

				if (!user)
					return done(null, false, {
						message: 'Invalid Username',
					});

				if (!password)
					return done(null, false, {
						message: 'Invalid Password',
					});

				const valid = await bcrypt.compare(password, user.password);

				if (!valid)
					return done(null, false, {
						message: 'Incorrect Password',
					});

				return done(
					null,
					{ username: user.username, saved: user.saved },
					{
						message: 'Logged in Successfully',
					}
				);
			} catch (error) {
				return done(error);
			}
		}
	)
);
