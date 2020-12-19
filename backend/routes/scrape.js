const express = require('express');
const router = express.Router();
const Gpu = require('../models/gpu.model');

const scraper = require('../scraper');

// router.route('/').get(scraper);

router.get('/', scraper);

module.exports = router;
