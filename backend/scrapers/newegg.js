const axios = require('axios');
const cheerio = require('cheerio');
const db = require('../models/gpu.model.js');

const scrapeNeweggGpus = async () => {
	console.log('Scraping Newegg...');
	try {
		const response = await axios.get('https://www.newegg.ca/p/pl?PageSize=96&N=100007708%208000&page=1', {
			'Cache-Control': 'no-cache',
			headers: {
				Mozilla:
					'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.3 Mozilla/5.0 (Macintosh; Intel Mac OS X x.y; rv:42.0) Gecko/20100101 Firefox/43.4.0',
			},
		});

		const gpus = [];

		var $ = cheerio.load(response.data, {
			normalizeWhitespace: true,
		});

		// scrape number of pages
		var pages = $('span[class="list-tool-pagination-text"] > strong').text();
		var numOfPages = pages.substring(pages.lastIndexOf('/') + 1);

		// load every page on newegg
		for (let i = 1; i <= numOfPages; i++) {
			const page = await axios.get(`https://www.newegg.ca/p/pl?PageSize=96&N=100007708%208000&page=${i}`);

			$ = cheerio.load(page.data, {
				normalizeWhitespace: true,
			});
			// scrape every gpu from the page
			$('div[class="item-cell"]').each((index, element) => {
				var gpu = {};

				// find link to Newegg page
				gpu.link = $(element).find('.item-info > a').attr('href');

				if (gpu.link.includes('Combo')) return;

				// find name of gpu
				gpu.title = $(element).find('.item-img > img').attr('title');

				// find dollar and cent value of gpu
				const priceData = $(element).find('.price-current');
				var price = +priceData.find('strong').text() + +priceData.find('sup').text();

				// price NaN check
				gpu.price = isNaN(price) || !price ? 'Sold Out' : price;

				// find brand name of gpu
				gpu.brand = $(element).find('.item-brand > img').attr('title');

				gpu.retailer = 'Newegg';

				// find image of gpu
				gpu.img = $(element).find('.item-img > img').attr('src');

				gpus.push(gpu);
			});
    }

		console.log('Scraped Newegg!');

		gpus.forEach((gpu) => {
			db.findOneAndUpdate({ title: gpu.title }, gpu, { upsert: true, useFindAndModify: false }, (err, doc) => {
				if (err) console.log(err);
			});
		});
	} catch (err) {
		console.log(err);
	}
};

module.exports = scrapeNeweggGpus;