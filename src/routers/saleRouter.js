const express = require('express');
const {
  newSale,
  getAllSales,
  getSaleById,
} = require('../controllers/saleController');

const saleRouter = express.Router();

saleRouter.post('/', newSale);

saleRouter.get('/', getAllSales);

saleRouter.get('/:id', getSaleById);

module.exports = saleRouter;
