const router = require('express').Router();
const gpuController = require('../controllers/gpuController');
const scraper = require('../scraper')

// /gpus
router.route('/').get(gpuController.findAll);

scraper();

module.exports = router;
