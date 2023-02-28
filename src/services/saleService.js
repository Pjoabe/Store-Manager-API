const { getById } = require('../models/productModel');
const { insertNewSaleProduct } = require('../models/saleModel');
const { insertSQLSale } = require('../models/saleModel');
const { validateSales } = require('../middlewares/validateSales');

const verifyLength = async (sales) => {
  const saleProduct = await Promise.all(
    sales.map(({ productId }) => getById(productId)),
  );
  return saleProduct.some((size) => !size.length);
};

const insertNewSale = async (sales) => {
  const testSales = sales.map((sale) => validateSales(sale));
   const error = testSales.filter((errortype) => errortype.type)[0];
  if (error) {
   if (error.message.indexOf('greater') !== -1) {
     return { type: 422, message: error.message };
   }
    return { type: 400, message: error.message };
  } if (await verifyLength(sales)) {
    return { type: 404, message: 'Product not found' };
  }
  const { insertId } = await insertSQLSale();
  const productsArray = await Promise.all(sales
    .map((sale) => insertNewSaleProduct(insertId, sale)));
  const product = {
    id: insertId,
    itemsSold: productsArray,
  };
  return { type: undefined, message: product };
};

module.exports = {
  insertNewSale,
};
