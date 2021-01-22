const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

router.post(
	'/signup',
	passport.authenticate('signup', { session: false }),
	async (req, res, next) => {
		res.json({
			message: 'Signup successful',
			user: req.user,
		});
	}
);

router.post('/login', async (req, res, next) => {
	passport.authenticate('login', async (err, user, info) => {
		try {
			if (err || !user) {
        console.log(err);
        console.log(user);
				return res.status(400).json({
					message: 'An error occurred.',
					user: user,
				});
			}

			req.login(user, { session: false }, async (error) => {
				if (error) return next(error);

				const body = { _id: user._id, email: user.email };
				const token = jwt.sign({ user: body }, 'test', { expiresIn: '60m' });

				return res.json({ token });
			});
		} catch (error) {
			return next(error);
		}
	})(req, res, next);
});

router.get(
	'/authenticated',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		console.log(req.user);
		res.json({ authenticated: true, user: req.user });
	}
);

module.exports = router;
