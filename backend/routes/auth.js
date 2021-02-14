const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

router.post('/signup', async (req, res, next) => {
	try {
		const username = req.body.username;
		const password = req.body.password;
		var user = null;
		// hash password with bcrypt
		const hash = await bcrypt.hash(password, 10);

		if (!username || !/^(?=.{4})[a-z\d]*_?[a-z\d]+$/i.test(username))
			return res.json({ message: 'Invalid username', user });

		const userExists = await User.findOne({ username }).exec();
		if (userExists) {
			return res.json({
				message: 'Username already exists',
				user,
			});
		}

		user = await User.create({ username, password: hash });

		res.json({
			message: 'Signup successful',
			user,
		});
	} catch (err) {
		console.log(err);
		return res.json({ message: 'An error has occurred', user });
	}
});

router.post('/login', async (req, res, next) => {
	passport.authenticate('login', async (err, user, info) => {
		try {
			if (err || !user) {
				return res.status(400).json({
					message: info.message,
					user: user,
				});
			}

			req.login(user, { session: false }, async (error) => {
				if (error) return next(error);
        
				const token = jwt.sign({ user }, 'test', { expiresIn: '60m' });
				res.cookie('access_token', token, { httpOnly: true, sameSite: true });

				return res.json({ token });
			});
		} catch (error) {
			return next(error);
		}
	})(req, res, next);
});

router.post(
	'/logout',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		res.clearCookie('access_token');
		res.json({ success: true });
	}
);

router.get(
	'/authenticated',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		// console.log(req.user);
		res.json({ authenticated: true, user: req.user });
	}
);

router.post(
	'/save',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		req.user.saved.push(req.body.gpuid);
		req.user.save((err) => {
			if (err) res.status(500).json({ message: 'An error occurred', id: null });
			else res.status(200).json({ message: 'Successfully saved', id: req.body.gpuid });
		});
	}
);

module.exports = router;
