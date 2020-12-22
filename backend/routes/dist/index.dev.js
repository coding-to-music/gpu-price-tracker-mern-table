"use strict";

var _require = require('express'),
    Router = _require.Router;

var router = require('express').Router();

var gpusRoutes = require('./gpus');

router.use('/gpus', gpusRoutes);
module.exports = router;