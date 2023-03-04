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

const newProduct = async (req, res) => {
  const { name } = req.body;
  const products = await productService.newInsertion(name);
  if (products.message === 'Product not insert') {
    return res.status(404).json(products);
  }
  const first = products[0];
  return res.status(201).json(first);
};

const updateProductByName = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  await productService.updateProductNameById(id, name);
  const newName = await productService.productById(id);
  if (newName.message) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.status(200).json(newName[0]);
};

const deleteProductById = async (req, res) => {
  const { id } = req.params;
  const productID = await productService.deleteProductFromDBById(id);
  if (productID.message) {
    return res.status(404).json(productID);
  }
  return res.status(204).end();
};

const searchProductByName = async (req, res) => {
  const { q } = req.query;
  const name = await productService.searchProductOnDBByName(q);
  if (name.length > 0) {
    return res.status(200).json(name);
  }
  return res.status(404).json({ error: 'Nenhum produto encontrado' });
};

module.exports = {
  getAllProducts,
  getProductById,
  newProduct,
  updateProductByName,
  deleteProductById,
  searchProductByName,
};