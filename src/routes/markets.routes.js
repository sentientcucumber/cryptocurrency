import express from 'express';
import * as Controller from '../controllers/merchant.controller';

const router  = express.Router();

router
  .get('/markets', Controller.getMarkets)
  .get('/markets/:market', Controller.getMarket)
  .get('/markets/:market/exchanges', Controller.getExchange);

export default router;
