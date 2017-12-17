const utils = require('../../libs/utils.js');
const config = require('../../config.js');

/**
 * This object contains the functions that will return the Promise to get the item data
 * @type {Object}
 */
const get = {
  baseData: id => fetch(`${config.baseUrl}/items/${id}`).then(r => r.json()),
  description: id => fetch(`${config.baseUrl}/items/${id}/description`).then(r => r.json()),
  category: id => fetch(`${config.baseUrl}/categories/${id}`).then(r => r.json())
};

module.exports = (req, res) => {
  // Create an array with promises to get the basic data and the description data.
  const fullData = [
    get.baseData(req.params.id),
    get.description(req.params.id)
  ];

  // After both promises are solved, create the item object, set the description and return it
  Promise.all(fullData).then(responses => {
    const baseData = responses[0];
    const description = responses[1];

    get.category(baseData.category_id).then((category) => {
      let item = {
        id: baseData.id,
        title: baseData.title,
        price: {
          currency: baseData.currency_id,
          amount: parseInt(baseData.price),
          decimals: utils.getDecimals(baseData.price)
        },
        picture: baseData.pictures[0].url,
        condition: baseData.condition,
        free_shipping: !!baseData.shipping.free_shipping,
        sold_quantity: baseData.sold_quantity,
        description: description.plain_text,
        categories: category.path_from_root.map((item) => item.name)
      };

      res.send({
        status: 'ok',
        data: {
          author: {
            name: 'Noel',
            lastname: 'Broda'
          },
          item: item
        }
      });
    });
  });
};
