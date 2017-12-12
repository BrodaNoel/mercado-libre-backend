const utils = require('../../libs/utils.js');
const config = require('../../config.js');

module.exports = (req, res) => {
  fetch(
    `${config.baseUrl}/items/${req.params.id}`,
    { method: 'GET' }
  ).then(response => response.json())
  .then(response => {
    let item = {
      id: response.id,
      title: response.title,
      price: {
        currency: response.currency_id,
        amount: parseInt(response.price),
        decimals: utils.getDecimals(response.price)
      },
      picture: response.pictures[0],
      condition: response.condition,
      free_shipping: !!response.shipping.free_shipping,
      sold_quantity: response.sold_quantity
    };

    // TODO: Implement it
    item.description = 'pending...';

    res.send({
      status: 'ok',
      data: {
        item: item
      }
    });
  });
};
