const router = require('express').Router();
const scrapers = require('../scrapers');
const gpusRoutes = require('./gpus');
const authRoutes = require('./auth');

router.use('/gpus', gpusRoutes);
router.use('/', authRoutes);

module.exports = router;
