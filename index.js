require('es6-promise').polyfill();
require('isomorphic-fetch');
var express = require('express');
var app = express();
var utils = require('./libs/utils.js');
const PORT = 9001;
const baseUrl = 'https://api.mercadolibre.com';

/**
 * This endpoint retrieve the list of element that were retrieved by the
 * https://api.mercadolibre.com/sites/MLA/search?q=xxx endpoint.
 * Documentation available: https://api.mercadolibre.com/sites/MLA/search?q=test#options
 */
app.get('/api/items', function(req, res) {
  fetch(
    `${baseUrl}/sites/MLA/search?q=${req.query.q}`,
    { method: 'GET' }
  ).then(response => response.json())
  .then(response => {
    const items = response.results.map(item => ({
      id: item.id,
      title: item.title,
      price: {
        currency: item.currency_id,
        amount: parseInt(item.price),
        decimals: utils.getDecimals(item.price)
      },
      picture: item.thumbnail,
      condition: item.condition,
      free_shipping: item.shipping.free_shipping
    }));

    res.send({
      status: 'ok',
      data: {
        items
      }
    });
  });
});

app.listen(PORT);
console.log(`Express running on port ${PORT}`);
