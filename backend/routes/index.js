const { Router } = require('express');
const router = require('express').Router();

const productRoutes = require('./products');
const scrapeRoutes = require('./scrape');

router.use('/products', productRoutes);

router.use('/scrape', scrapeRoutes);

module.exports = router;