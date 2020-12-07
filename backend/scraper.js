const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async (req, res) => {

  const { query } = req.query;

  
  axios.get('https://www.newegg.ca/msi-radeon-rx-570-rx-570-armor-8g-oc/p/N82E16814137256')
    .then(response => {
      const $ = cheerio.load(response.data);
      var brand = $('h1[class=product-title]').html();
      console.log(brand);

  });
}