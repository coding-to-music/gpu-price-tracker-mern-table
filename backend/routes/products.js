const router = require('express').Router();

const search = require('../scraper');

router.get('/', (req, res) => {
	res.send('products page');
	console.log('products!');
});

router.route('/test').get(search);

module.exports = router;
