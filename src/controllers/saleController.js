const { insertNewSale, searchAllSales, searchById } = require('../services/saleService');

const newSale = async (req, res) => {
  const sale = req.body;
  const response = await insertNewSale(sale);
  if (response.type) {
    return res.status(response.type).json({ message: response.message });
  }
  return res.status(201).json(response.message);
};

const getAllSales = async (_req, res) => {
  const response = await searchAllSales();
  return res.status(response.type).json(response.message);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const response = await searchById(id);
  return res.status(response.type).json(response.message);
}; 

module.exports = {
  newSale,
  getAllSales,
  getSaleById,
};
