const router = require('express').Router();
const gpuController = require('../controllers/gpuController');

// /gpus
router.route('/').get(gpuController.findAll);
router.route('/lastUpdated').get(gpuController.getLastUpdatedDate)

module.exports = router;
