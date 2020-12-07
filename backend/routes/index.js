const { Router } = require('express');
const router = require('express').Router();

const productRoutes = require('./products');

router.use('/', productRoutes);

module.exports = router;