const { Router } = require('express');
const router = require('express').Router();

const gpusRoutes = require('./gpus');

router.use('/gpus', gpusRoutes);

module.exports = router;