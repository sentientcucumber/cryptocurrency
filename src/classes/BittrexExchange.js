const Exchange = require('./Exchange');
const request  = require('request');
const format   = require('util').format;

class BittrexExchange extends Exchange {

  constructor() {
    super('Bittrex', 'https://bittrex.com/api/v1.1/public/getticker');
  }

  getMarket(market, amount, callback) {
    return request({
      uri: this.url,
      qs: {
        market: `${market.bid.toLowerCase()}-${market.ask.toLowerCase()}`
      },
      json: true
    }, (err, res, body) => {
      if (err) {
        return callback(err);
      }

      let a = amount;
      if (a) {
        a = a / body.result.Ask;
      }

      return callback(null, {
        name: this.name,
        ask: body.result.Ask,
        amount: a
      });
    });
  }
}

module.exports = BittrexExchange;
