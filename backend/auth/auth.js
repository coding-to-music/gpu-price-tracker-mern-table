const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt');

const cookieExtractor = (req) => {
	let token = null;
  console.log(req);
  if (req.cookies) console.log("TEST")
	if (req && req.cookies) {
		console.log('TOKEN', req.cookies['access_token']);
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
