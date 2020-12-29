const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const db = require('../models/gpu.model.js');

const url =
	'https://www.bestbuy.ca/en-ca/category/graphics-cards/20397?path=category%253AComputers%2B%2526%2BTablets%253Bcategory%253APC%2BComponents%253Bcategory%253AGraphics%2BCards%253Bsoldandshippedby0enrchstring%253ABest%2BBuy';

const run = async () => {
	// load best buy url
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(url);

	console.log('Scraping Best Buy...');

	// css selector for span element to show more pages
	const cssSelector = 'button[class="button_2Xgu4 secondary_3qojI  button_1Yg9v loadMore_3AoXT regular_cDhX6"] > span';
	let loadMoreVisible = await isElementVisible(page, cssSelector);

	// click show more until no longer visible
	while (loadMoreVisible) {
		await page.click(cssSelector).catch(() => {});
		console.log('Found span');
		loadMoreVisible = await isElementVisible(page, cssSelector);
	}

	const bodyHandle = await page.$('body');
  const { height } = await bodyHandle.boundingBox();
  await bodyHandle.dispose();

  // Scroll one viewport at a time, pausing to let content load
  const viewportHeight = 500;
  let viewportIncr = 0;
  while (viewportIncr + viewportHeight < height) {
    await page.evaluate(_viewportHeight => {
      window.scrollBy(0, _viewportHeight);
    }, viewportHeight);
    await wait(20);
    viewportIncr = viewportIncr + viewportHeight;
  }

  // Scroll back to top
  await page.evaluate(_ => {
    window.scrollTo(0, 0);
  });

  // Some extra delay to let images load
  await wait(5000);
  
	const content = await page.content();
	const $ = cheerio.load(content);

	const gpus = [];
	$('div[class="col-xs-12_1GBy8 col-sm-4_NwItf col-lg-3_2V2hX x-productListItem productLine_2N9kG"]').each(
		(index, element) => {
			var gpu = {};

			gpu.link = 'https://www.bestbuy.ca' + $(element).find('.link_3hcyN').attr('href');

			gpu.title = $(element).find('.productItemName_3IZ3c').text();

			gpu.price = parseFloat($(element).find('meta[itemprop="price"]').attr('content'));

			gpu.brand = gpu.title.split(' ')[0];

			gpu.retailer = 'Best Buy';

			gpu.img = $(element).find('img[class="productItemImage_1en8J"]').attr('src');

			// console.log(gpu.img);

			gpus.push(gpu);
		}
	);

	// console.log(gpus);
	// console.log(gpus.length);

	// upsert gpus
	gpus.forEach((gpu) => {
		db.findOneAndUpdate({ title: gpu.title }, gpu, { upsert: true, useFindAndModify: false }, (err, doc) => {
			if (err) console.log(err);
		});
	});

	console.log('Scraped Best Buy!');

	browser.close();
};

const isElementVisible = async (page, cssSelector) => {
	// check if css selector is visible

	let visible = true;
	await page.waitForSelector(cssSelector, { visible: true, timeout: 10000 }).catch(() => {
		visible = false;
	});
	return visible;
};

function wait (ms) {
  return new Promise(resolve => setTimeout(() => resolve(), ms));
}

module.exports = run;