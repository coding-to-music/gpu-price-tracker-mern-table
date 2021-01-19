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
			jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token'),
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
	'signup',
	new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password',
		},
		async (email, password, done) => {
			try {
				// hash password with bcrypt
				const hash = await bcrypt.hash(password, 10);
				const user = await User.create({ email: email, password: hash });

				return done(null, user);
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
			usernameField: 'email',
			passwordField: 'password',
		},
		async (email, password, done) => {
			try {
        const user = await User.findOne({ email });
        console.log(user);

        const valid = await bcrypt.compare(password, user.password);

        
				if (!user || !valid)
					return done(null, false, { message: 'Incorrect Email/Password' });

				return done(null, user, { message: 'Logged in Successfully' });
			} catch (error) {
				return done(error);
			}
		}
	)
);
