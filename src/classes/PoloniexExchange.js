import Exchange from './Exchange';
import request from 'request';

export default class PoloniexExchange extends Exchange {

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

      let prop = `${market.bid.toUpperCase()}_${market.ask.toUpperCase()}`;
      let ask = parseFloat(body[prop].lowestAsk);
      let result = {
        name: this.name,
        ask: ask
      };
      
      if (amount) {
        result.amount = amount / result.ask;
      }
      
      return callback(null, result);
    });
  }
}
