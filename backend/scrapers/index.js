const scrapeNewegg = require("./newegg");
const scrapeMemoryExpress = require("./memoryexpress");
const scrapeBestBuy = require("./bestbuy");
const schedule = require("node-schedule");

require("dotenv").config({ path: "../../.env" });

const scrapeAll = () => {
  scrapeNewegg();
  scrapeBestBuy();
  scrapeMemoryExpress();
};

if (process.env.NODE_ENV === "production") {
  // scrapeAll();
  //   schedule.scheduleJob("*/60 * * * *", scrapeAll);
} else {
  scrapeAll();
  // scrapeAll();
  // schedule.scheduleJob("*/60 * * * *", scrapeAll);
}

module.exports = scrapeAll;
