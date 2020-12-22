const db = require('../models/gpu.model');

const findAll = async (req, res) => {
	db.find({})
		.then(gpus => res.json(gpus))
		.catch(err => res.status(502).json(err));
};

module.exports = {
  findAll: findAll,
}
