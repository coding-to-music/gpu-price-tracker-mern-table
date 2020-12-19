const express = require('express');
const router = express.Router();
const Gpu = require('../models/gpu.model');

const scrapeAllGpus = require('../scraper');

// router.route('/').get(scraper);

router.get('/', (req, res) => {
	console.log('Scraping Newegg...');

	scrapeAllGpus.then((data) => {
		console.log('Successfully scraped NewEgg!');
		res.json(data);
	});
});

module.exports = router;
