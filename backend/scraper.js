const axios = require('axios');
const cheerio = require('cheerio');
const db = require('./models/gpu.model.js');
const schedule = require('node-schedule');

const scrapeAllGpus = async () => {
	console.log('Scraping Newegg...');
	try {
		const response = await axios.get('https://www.newegg.ca/Desktop-Graphics-Cards/SubCategory/ID-48?PageSize=96');

		const gpus = [];

		var $ = cheerio.load(response.data, {
			normalizeWhitespace: true,
		});

		// scrape number of pages
		var pages = $('span[class="list-tool-pagination-text"] > strong').text();
		var numOfPages = pages.substring(pages.lastIndexOf('/') + 1);

		// console.log(numOfPages);

		// load every page on newegg
		for (let i = 1; i <= numOfPages; i++) {
			const page = await axios.get(
				`https://www.newegg.ca/Desktop-Graphics-Cards/SubCategory/ID-48/Page-${i}?PageSize=96`
			);

			$ = cheerio.load(page.data, {
				normalizeWhitespace: true,
			});

			// scrape every gpu from the page
			$('div[class="item-cell"]').each((index, element) => {
				var gpu = {};

				// find name of gpu
				gpu.title = $(element).find('.item-img > img').attr('title');

				// find dollar and cent value of gpu
				const priceData = $(element).find('.price-current');
				var price = +priceData.find('strong').text() + +priceData.find('sup').text();

				// price NaN check
				gpu.price = isNaN(price) || !price ? "Sold Out" : price;

				// find brand name of gpu
        gpu.brand = $(element).find('.item-brand > img').attr('title');
        
        gpu.retailer = 'Newegg';

				// find link to Newegg page
				gpu.link = $(element).find('.item-info > a').attr('href');

				// find image of gpu
				gpu.img = $(element).find('.item-img > img').attr('src');

				gpus.push(gpu);
			});
		}

		console.log('Successfully scraped Newegg!');

		gpus.forEach((gpu) => {
			db.findOneAndUpdate({ title: gpu.title }, gpu, { upsert: true, useFindAndModify: false }, (err, doc) => {
				if (err) console.log(err);
			});
		});
	} catch (err) {
		console.log(err);
	}
};

// schedule scrape for every day
const scheduleGpuScrape = schedule.scheduleJob('0 0 */1 * *', scrapeAllGpus);

module.exports = scrapeAllGpus;