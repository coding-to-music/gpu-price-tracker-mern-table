const axios = require('axios');
const cheerio = require('cheerio');
const db = require('../models/gpu.js');

const scrapeMeGpus = async () => {
	console.log('Scraping Memory Express...');
	try {
		const response = await axios.get(
			'https://www.memoryexpress.com/Category/VideoCards?FilterID=b9021f59-29a3-73a7-59b5-125edab939f2&Page=1',
			{
				'Cache-Control': 'no-cache',
				headers: {
					Mozilla:
						'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.3 Mozilla/5.0 (Macintosh; Intel Mac OS X x.y; rv:42.0) Gecko/20100101 Firefox/43.4.0',
				},
			}
		);

		const gpus = [];

		var $ = cheerio.load(response.data, {
			normalizeWhitespace: true,
		});

		// scrape number of pages
		var pages = parseInt(
			$('.l-cact-category-page__body')
				.find('div[class="AJAX_List_Pager"] > ul > li:nth-last-child(2)')
				.text()
				.trim()
				.substring(1)
		);

		// load every page on newegg
		for (let i = 1; i <= pages; i++) {
			const page = await axios.get(
				`https://www.memoryexpress.com/Category/VideoCards?FilterID=b9021f59-29a3-73a7-59b5-125edab939f2&Page=${i}`
			);

			$ = cheerio.load(page.data, {
				normalizeWhitespace: true,
			});
			// scrape every gpu from the page
			$('div[class="c-shca-icon-item"]').each((index, element) => {
				var gpu = {};

				// find link to Newegg page
				gpu.link =
					'https://www.memoryexpress.com/' +
					$(element).find('.c-shca-icon-item__body-image > a').attr('href');

				// find name of gpu
				gpu.title = $(element)
					.find('.c-shca-icon-item__body-name > a')
					.text()
					.trim();

				// find dollar and cent value of gpu
				var price = parseFloat(
					$(element)
						.find('.c-shca-icon-item__summary-list > span')
						.text()
						.trim()
						.substring(1)
						.replace(',', '')
				);

				// price NaN check
				gpu.price = isNaN(price) || !price ? 'Sold Out' : price;

				// find brand name of gpu
				gpu.brand = $(element)
					.find('.c-shca-icon-item__body-name-brand > img')
					.attr('alt');

				gpu.retailer = 'Memory Express';

				// find image of gpu
				gpu.img = $(element)
					.find('.c-shca-icon-item__body-image > a > img')
					.attr('src');
				if (!gpu.img)
					gpu.img = $(element)
						.find('.c-shca-icon-item__body-image > a > img')
						.attr('data-lazy-src');

				gpus.push(gpu);
			});
		}

		gpus.forEach((gpu) => {
			db.findOneAndUpdate(
				{ title: gpu.title },
				gpu,
				{ upsert: true, useFindAndModify: false },
				(err, doc) => {
					if (err) console.log(err);
				}
			);
		});

		console.log('Scraped Memory Express!');
	} catch (err) {
		console.log(err);
	}
};

module.exports = scrapeMeGpus;
