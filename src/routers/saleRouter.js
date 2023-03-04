const express = require('express');
const {
  newSale,
  getAllSales,
  getSaleById,
  removeById,
} = require('../controllers/saleController');

const saleRouter = express.Router();

saleRouter.post('/', newSale);

saleRouter.get('/', getAllSales);

saleRouter.get('/:id', getSaleById);

saleRouter.delete('/:id', removeById);

module.exports = saleRouter;
