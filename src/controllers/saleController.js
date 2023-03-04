const { insertNewSale, searchAllSales,
  searchById, removeFromDB } = require('../services/saleService');

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

const removeById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await removeFromDB(id);
  if (type) {
    return res.status(type).json({ message });
  }
  return res.status(204).json(message);
};

module.exports = {
  newSale,
  getAllSales,
  getSaleById,
  removeById,
};
