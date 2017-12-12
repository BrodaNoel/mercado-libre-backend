// Add promise and fetch support
require('es6-promise').polyfill();
require('isomorphic-fetch');
const express = require('express');
const app = express();
const config = require('./config.js');
const items = require('./api/items');

/**
 * This endpoint retrieve the list of elements that were retrieved by the
 * https://api.mercadolibre.com/sites/MLA/search?q=xxx endpoint.
 * Documentation available: https://api.mercadolibre.com/sites/MLA/search?q=test#options
 */
app.get('/api/items', items.query);

/**
 * This endpoint retrieve the element detail for a given element id.
 * http://localhost:9001/api/items/MLA673538490
 * Documentation available: https://api.mercadolibre.com/items/MLA673538490#json
 */
app.get('/api/items/:id', items.id);

app.listen(config.port);
console.log(`Express running on port ${config.port}`);
