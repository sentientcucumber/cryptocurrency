const express = require('express');
const markets = require('./routes/markets.routes.js');
const app = express();

app
  .use('/', markets)
  .use((err, req, res, next) => {
    if (Number.isInteger(err)) {
      return res.status(err).json({
        error: 'error'
      });
    }
  });

app.listen(8080, () => {
  console.log('Listening on port 8080');
});
