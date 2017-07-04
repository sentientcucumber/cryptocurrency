const express = require('express');
const controller = require('../controllers/merchant.controller.js');
const router  = express.Router();

router
  .get('/markets', controller.getMarkets)
  .get('/markets/:market', controller.getMarket)
  .get('/markets/:market/exchanges', controller.getExchange);

module.exports = router
