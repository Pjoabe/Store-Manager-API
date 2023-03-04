const { insertNewSaleProduct,
  getAllSaleDetails, getSaleDetailsById } = require('../models/saleModel');
const { insertSQLSale, deleteFromDBById } = require('../models/saleModel');
const { validateSales } = require('../middlewares/validateSales');

const verifyLength = async (sales) => {
  const saleProduct = await Promise.all(
    sales.map(({ productId }) => getSaleDetailsById(productId)),
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

const searchAllSales = async () => {
  const result = await getAllSaleDetails();
  return { type: 200, message: result };
};

const searchById = async (id) => {
  const result = await getSaleDetailsById(id);
  if (!result.length) {
    return { type: 404, message: { message: 'Sale not found' } };
  }
  return { type: 200, message: result };
};

const removeFromDB = async (id) => {
  const result = await getSaleDetailsById(id);
  if (!result.length) {
    return { type: 404, message: 'Sale not found' };
  }
  await deleteFromDBById(id);
  return true;
};

module.exports = {
  insertNewSale,
  searchById,
  searchAllSales,
  removeFromDB,
};
