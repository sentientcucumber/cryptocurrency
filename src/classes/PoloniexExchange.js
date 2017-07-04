const Exchange = require('./Exchange');
const request  = require('request');
const format   = require('util').format;

class PoloniexExchange extends Exchange {

  constructor() {
    super('Poloniex', 'https://poloniex.com/public?command=returnTicker');
  }

  getMarket(market, amount, callback) {
    return request({
      uri: this.url,
      json: true
    }, (err, res, body) => {
      if (err) {
        return callback(err);
      }

      try {
        let prop = `${market.bid.toUpperCase()}_${market.ask.toUpperCase()}`;
        
        let a = amount;
        if (a) {
          a = a / body[prop].lowestAsk;
        }
 
        return callback(null, {
          name: this.name,
          ask: parseFloat(body[prop].lowestAsk),
          amount: a
        });
      } catch(e) {
        return callback(e);
      }
    });
  }
}

module.exports = PoloniexExchange;
