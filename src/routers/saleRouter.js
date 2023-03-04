const express = require('express');
const {
  newSale,
  getAllSales,
  getSaleById,
  removeById,
  updateById,
} = require('../controllers/saleController');

const saleRouter = express.Router();

saleRouter.post('/', newSale);

saleRouter.get('/', getAllSales);

saleRouter.get('/:id', getSaleById);

saleRouter.delete('/:id', removeById);

saleRouter.put('/:id', updateById);

module.exports = saleRouter;
