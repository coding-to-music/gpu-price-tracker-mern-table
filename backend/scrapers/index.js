const scrapeNewegg = require('./newegg');
const scrapeMemoryExpress = require('./memoryexpress');
const scrapeBestBuy = require('./bestbuy');
const schedule = require('node-schedule');

require('dotenv').config({ path: '../../.env' });

const scrapeAll = () => {
	scrapeNewegg();
	scrapeBestBuy();
	scrapeMemoryExpress();
};

if (process.env.NODE_ENV === 'production') {
  scrapeAll();
} else {
  schedule.scheduleJob('*/30 * * * *', scrapeAll);
}

module.exports = scrapeAll;
