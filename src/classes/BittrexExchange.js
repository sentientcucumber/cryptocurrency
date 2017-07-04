import Exchange from './Exchange';
import request from 'request';

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

      let ask = body.result.Ask;
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

export default BittrexExchange;
