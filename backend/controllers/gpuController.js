const db = require('../models');

const findAll = async (req, res) => {
  try {
    res.json(await db.Gpu.find(req.query));
  } catch(err) {
    res.status(422).json(err)
  }
}