import express from 'express';
import mongoose from 'mongoose';
import marketRoutes from './routes/markets.routes'

const app = express();

mongoose.connect('mongodb://localhost/cc', {
  useMongoClient: true
});

app
  .use('/', marketRoutes)
  .use((err, req, res, next) => {
    if (Number.isInteger(err)) {
      if (err === 404) {
        return res.status(err).json({
          error: `No resource available at ${req.path}`
        });
      }

      return res.status(500).json({
        error: 'An error occurred'
      });
    }
  });

app.listen(8080);
