const utils = require('../../libs/utils.js');
const config = require('../../config.js');

module.exports = (req, res) => {
  fetch(
    `${config.baseUrl}/sites/MLA/search?q=${req.query.q}`,
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
      free_shipping: !!item.shipping.free_shipping,
      address: item.address
    }));

    res.send({
      status: 'ok',
      data: {
        items
      }
    });
  });
};
