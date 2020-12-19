const axios = require('axios');
const cheerio = require('cheerio');

const scrapeAllGpus = async () => {
	try {
		const response = await axios.get('https://www.newegg.ca/Desktop-Graphics-Cards/SubCategory/ID-48?PageSize=96');

		const gpus = [];

		var $ = cheerio.load(response.data, {
			normalizeWhitespace: true,
		});

		// scrape number of pages
		var pages = $('span[class="list-tool-pagination-text"] > strong').text();
		var numOfPages = pages.substring(pages.lastIndexOf('/') + 1);

		// load every page on newegg
		for (let i = 1; i <= numOfPages; i++) {
			const page = await axios.get(
				`https://www.newegg.ca/Desktop-Graphics-Cards/SubCategory/ID-48/Page-${i}?PageSize=96`
			);

			// scrape gpu details
			$('div[class="item-cell"]').each((index, element) => {
				var gpu = {};

				gpu.title = $(element).find('.item-img > img').attr('title');

				const priceData = $(element).find('.price-current');
				gpu.price = +priceData.find('strong').text() + +priceData.find('sup').text();

				gpu.brand = $(element).find('.item-brand > img').attr('title');

				gpu.link = $(element).find('.item-info > a').attr('href');

				gpus.push(gpu);
			});
		}
    return gpus;
    
	} catch (err) {
		console.log(err);
	}
};

module.exports = scrapeAllGpus();
