const db = require('../models/gpu.model');

const findAll = async (req, res) => {
	db.find({})
		.then((gpus) => res.json(gpus))
		.catch((err) => res.status(502).json(err));
};

const getLastUpdatedDate = async (req, res) => {
	db.find({})
		.sort({ updatedAt: -1 })
		.then((gpu) => res.json(gpu[0].updatedAt))
		.catch((err) => res.status(502).json(err));
};

module.exports = {
	findAll: findAll,
	getLastUpdatedDate: getLastUpdatedDate,
};
