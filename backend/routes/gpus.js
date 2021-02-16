const router = require('express').Router();
const gpuController = require('../controllers/gpuController');
const passport = require('passport');

// /gpus
router.route('/').get(gpuController.findAll);
router.route('/lastUpdated').get(gpuController.getLastUpdatedDate);

router.post(
	'/save',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		req.user.saved.push(req.body.id);
		req.user.save((err) => {
			if (err) res.status(500).json({ message: 'An error occurred', id: null });
			else
				res
					.status(200)
					.json({ message: 'Successfully saved', id: req.body.id });
		});
	}
);

router.get(
	'/saved',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const saved = req.user.saved;
		res.json({ saved });
	}
);

router.delete(
	'/delete',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		var saved = req.user.saved;
		const filtered = saved.filter((val) => val !== req.body.id);

		if (saved.length == filtered.length)
			res
				.status(406)
				.json({ messaage: 'Could not find GPU in saved', id: null });
		else
			req.user.save((err) => {
				if (err)
					res.status(500).json({ message: 'An error occurred', id: null });
				else
					res
						.status(200)
						.json({ message: 'Successfully deleted', id: req.body.id });
			});
	}
);

module.exports = router;
