const { insertNewSale } = require('../services/saleService');

const newSale = async (req, res) => {
  const sale = req.body;
  const response = await insertNewSale(sale);
  if (response.type) {
    return res.status(response.type).json({ message: response.message });
  }
  return res.status(201).json(response.message);
};

module.exports = {
  newSale,
};
