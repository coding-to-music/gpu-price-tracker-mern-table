const router = require('express').Router();
const gpuController = require('../controllers/gpuController');

// /gpus
router.route('/').get(gpuController.findAll);

module.exports = router;
