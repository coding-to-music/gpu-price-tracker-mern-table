"use strict";

var axios = require('axios');

var cheerio = require('cheerio');

var db = require('./models/gpu.model.js');

var schedule = require('node-schedule');

var scrapeAllGpus = function scrapeAllGpus() {
  var $, pages, numOfPages;
  return regeneratorRuntime.async(function scrapeAllGpus$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          console.log('Scraping Newegg...');
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(function _callee() {
            var response, gpus, i, page;
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return regeneratorRuntime.awrap(axios.get('https://www.newegg.ca/Desktop-Graphics-Cards/SubCategory/ID-48?PageSize=96'));

                  case 2:
                    response = _context.sent;
                    gpus = [];
                    $ = cheerio.load(response.data, {
                      normalizeWhitespace: true
                    }); // scrape number of pages

                    pages = $('span[class="list-tool-pagination-text"] > strong').text();
                    numOfPages = pages.substring(pages.lastIndexOf('/') + 1); // console.log(numOfPages);
                    // load every page on newegg

                    i = 1;

                  case 8:
                    if (!(i <= numOfPages)) {
                      _context.next = 17;
                      break;
                    }

                    _context.next = 11;
                    return regeneratorRuntime.awrap(axios.get("https://www.newegg.ca/Desktop-Graphics-Cards/SubCategory/ID-48/Page-".concat(i, "?PageSize=96")));

                  case 11:
                    page = _context.sent;
                    $ = cheerio.load(page.data, {
                      normalizeWhitespace: true
                    }); // scrape every gpu from the page

                    $('div[class="item-cell"]').each(function (index, element) {
                      var gpu = {}; // find name of gpu

                      gpu.title = $(element).find('.item-img > img').attr('title'); // find dollar and cent value of gpu

                      var priceData = $(element).find('.price-current');
                      var price = +priceData.find('strong').text() + +priceData.find('sup').text(); // price NaN check

                      gpu.price = isNaN(price) || !price ? 0 : price; // find brand name of gpu

                      gpu.brand = $(element).find('.item-brand > img').attr('title'); // find link to Newegg page

                      gpu.link = $(element).find('.item-info > a').attr('href'); // find image of gpu

                      gpu.img = $(element).find('.item-img > img').attr('src');
                      gpus.push(gpu);
                    });

                  case 14:
                    i++;
                    _context.next = 8;
                    break;

                  case 17:
                    console.log('Successfully scraped Newegg!');
                    gpus.forEach(function (gpu) {
                      db.findOneAndUpdate({
                        title: gpu.title
                      }, gpu, {
                        upsert: true,
                        useFindAndModify: false
                      }, function (err, doc) {
                        if (err) console.log(err);
                      });
                    });

                  case 19:
                  case "end":
                    return _context.stop();
                }
              }
            });
          }());

        case 4:
          _context2.next = 9;
          break;

        case 6:
          _context2.prev = 6;
          _context2.t0 = _context2["catch"](1);
          console.log(_context2.t0);

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 6]]);
}; // schedule scrape for every day


var scheduleGpuScrape = schedule.scheduleJob('0 0 */1 * *', scrapeAllGpus);
module.exports = scrapeAllGpus;