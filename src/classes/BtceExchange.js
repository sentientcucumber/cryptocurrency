const Exchange = require('./Exchange');
const request  = require('request');
const format   = require('util').format;

class BtceExchange extends Exchange {

  constructor() {
    super('BTC-E', 'https://btc-e.com/api/3/ticker');
  }

  getMarket(market, amount, callback) {
    let ask = market.ask.toLowerCase();
    if (ask === 'dash') {
      ask = 'dsh';
    }
    let m = `${ask}_${market.bid.toLowerCase()}`;
    
    return request({
      uri: `${this.url}/${m}`,
      json: true
    }, (err, res, body) => {
      if (err) {
        return callback(err);
      }

      try {
        let a = amount;
        if (a) {
          a = a / body[m].sell;
        }
 
        return callback(null, {
          name: this.name,
          ask: parseFloat(body[m].sell),
          amount: a
        });
      } catch(e) {
        console.log(e);
        return callback(e);
      }
    });
  }
}

module.exports = BtceExchange;
