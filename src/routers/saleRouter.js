const express = require('express');
const { newSale } = require('../controllers/saleController');

const saleRouter = express.Router();

saleRouter.post('/', newSale);

module.exports = saleRouter;
