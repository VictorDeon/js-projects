const axios = require('axios');
const cheerio = require('cheerio');
var fs = require('fs');

const URL = "https://www.imdb.com/title/tt0102926/?ref_=nv_sr_1";

(async () => {
  const response = await axios.get(URL);
  fs.appendFile('scrapping/imdb.html', response.data, error => console.log(error));
  let $ = cheerio.load(response.data);

  let title = $('h1[data-testid="hero-title-block__title"]').text();
  let rating = $('#__next div.TitleBlock__Container-sc-1nlhx7j-0.hglRHk span.AggregateRatingButton__RatingScore-sc-1ll29m0-1.iTLWoV').text();
  console.log(title, rating);
})();
