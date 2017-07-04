const request          = require('request');
const _                = require('lodash');
const format           = require('util').format;
const async            = require('async');
const Market           = require('../classes/Market');
const PoloniexExchange = require('../classes/PoloniexExchange');
const BittrexExchange  = require('../classes/BittrexExchange');
const BtceExchange     = require('../classes/BtceExchange');

// A list of registered markets.
var markets = {
  btc_eth:  new Market('btc_eth'),
  btc_ltc:  new Market('btc_ltc'),
  btc_dash: new Market('btc_dash')
};

// A list of registered exchanges.
var exchanges = [
  new PoloniexExchange(),
  new BittrexExchange(),
  new BtceExchange()
];

/**
 * Get information for a specific market.
 */
function getMarket(req, res, next) {
  let market = findMarket(req, next);
  if (!market) {
    return next(404);
  }

  return res.json(market);
}

/**
 * Get the list of registered markets.
 */
function getMarkets(req, res, next) {
  return res.json(_.map(markets, 'name'));
}

/**
 * Get the exchange information for a given market.
 */
function getExchange(req, res, next) {
  let market = findMarket(req);
  if (!market) {
    return next(404);
  }

  async.parallel(mapExchange(market, req.query.amount), (err, results) => {
    if (err) {
      return res.json(err);
    }

    return res.json({
      market: market.name,
      exchanges: orderResults(results, req.query.order)
    });
  });
}

/**
 * Get the market from the list of registered markets.
 */
function findMarket(req) {
  let name = req.params.market;
  if (!markets[name]) {
    return null;
  }

  return markets[name];
}

/**
 * Order the results based on the query parameter passed in.
 */
function orderResults(results, order) {
  let sorted = _.sortBy(results, ['ask']);
  askDifference(sorted, order);
  amountDifference(sorted);

  // By default, _.sortBy will sort in ascending order
  if (order === 'desc') {
    _.reverse(sorted); // Destructive to original array
  }

  return sorted;
}

/**
 * Get a list of the exchange's getMarket function with the parameters
 * from the request.
 */
function mapExchange(market, amount) {
  return _.map(exchanges, (exchange) => {
    return _.bind(exchange.getMarket, exchange, market, amount)
  });
}

/**
 * Calculate the 'ask' difference between the different exchanges.
 */
function askDifference(exchanges) {
  let low = exchanges[0].ask;

  for (let i = 0; i < exchanges.length; i++) {
    exchanges[i].askDifference = (exchanges[i].ask - low).toFixed(8);
  }
}

/**
 * Calculate the 'amount' difference between the different
 * exchanges. The amount difference is only determined if an amount is
 * provided.
 */
function amountDifference(exchanges) {
  let low = exchanges[0].amount;
  if (low === undefined) {
    return;
  }

  for (let i = 0; i < exchanges.length; i++) {
    exchanges[i].amountDifference = (exchanges[i].amount - low).toFixed(8);
  }
}

module.exports = {
  getMarket,
  getMarkets,
  getExchange
};
