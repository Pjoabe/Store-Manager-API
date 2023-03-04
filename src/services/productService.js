const { productModel } = require('../models');

const allProducts = async () => {
  const products = await productModel.getAll();
  return products;
};

const productById = async (id) => {
  const productsId = await productModel.getById(id);

  if (!productsId.length) {
    return { message: 'Product not found' };
  }
  return productsId;
};

const newInsertion = async (name) => {
  const insert = await productModel.insertSQL(name);
  const newProduct = await productModel.getById(insert);
  if (newProduct.length === 0) {
    return { message: 'Product not insert' };
  }
  return newProduct;
};

const updateProductNameById = async (id, name) => {
  const productsId = await productModel.getById(id);

  if (!productsId.length) {
    return { message: 'Product not found' };
  }

  await productModel.updateSQL(id, name);

  const updatedProduct = await productModel.getById(id);

  return updatedProduct;
};

const deleteProductFromDBById = async (id) => {
  const productsId = await productModel.getById(id);
  if (!productsId.length) {
    return { message: 'Product not found' };
  }
  await productModel.removeSQL(id);
  return productsId;
};

module.exports = {
  allProducts,
  productById,
  newInsertion,
  updateProductNameById,
  deleteProductFromDBById,
};
