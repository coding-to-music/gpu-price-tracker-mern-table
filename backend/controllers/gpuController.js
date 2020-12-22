const db = require('../models');

const findAll = async (req, res) => {
	db.Gpus.find({})
		.then(gpus => res.json(gpus))
		.catch(err => res.status(502).json(err));
};
