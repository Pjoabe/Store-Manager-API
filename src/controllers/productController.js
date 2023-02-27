const { productService } = require('../services');

const getAllProducts = async (_req, res) => {
  const products = await productService.allProducts();
  return res.status(200).json(products);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await productService.productById(id);

  if (product.message === 'Product not found') {
    return res.status(404).json(product);
  }
  const first = product[0];
  return res.status(200).json(first);
};

module.exports = {
  getAllProducts,
  getProductById,
};
