import Exchange from './Exchange';
import request from 'request';

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

      let result = {
        name: this.name,
        ask: parseFloat(body[m].sell)
      };

      if (amount) {
        result.amount = amount / result.ask;
      }
        
      return callback(null, result);
    });
  }
}

export default BtceExchange;
