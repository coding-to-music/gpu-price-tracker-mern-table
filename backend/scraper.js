const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
	const { query } = req.query;

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
		for (let i = 1; i <= 1; i++) {
			const page = await axios.get(
				`https://www.newegg.ca/Desktop-Graphics-Cards/SubCategory/ID-48/Page-${i}?PageSize=96`
			);

      // scrape gpu name and price
			$('div[class="item-cell"]').each((index, element) => {
        var title = $(element).find('.item-img > img').attr('title');

        const priceData = $(element).find('.price-current');
        var price = (+priceData.find('strong').text()) + (+priceData.find('sup').text());

        gpus.push({
          title: title,
          price: price,
        });
			});
    }
    console.log(gpus);

	} catch (err) {
		console.log(err);
	}
};
