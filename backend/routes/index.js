const router = require('express').Router();
const scrapers = require ('../scrapers');
const gpusRoutes = require('./gpus');

router.use('/gpus', gpusRoutes);

module.exports = router;