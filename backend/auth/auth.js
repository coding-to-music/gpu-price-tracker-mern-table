const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt');

passport.use(
	new JWTstrategy(
		{
			secretOrKey: 'test',
			jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
		},
		async (token, done) => {
			try {
				return done(null, token.user);
			} catch (error) {
				done(error);
			}
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

				if (!user) return done(null, false, 'Invalid Username');

				const valid = await bcrypt.compare(password, user.password);

				if (!valid) return done(null, false, 'Incorrect Password');

				return done(null, user, 'Logged in Successfully');
			} catch (error) {
				return done(error);
			}
		}
	)
);
