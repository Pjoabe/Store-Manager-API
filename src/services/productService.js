const { productModel } = require('../models');

const allProducts = async () => {
  const products = await productModel.getAll();
  return products;
};

const productById = async (id) => {
  const productsId = await productModel.getById(id);

  if (productsId.length === 0) {
    return { message: 'Product not found' };
  }
  return productsId;
};

module.exports = {
  allProducts,
  productById,
};
