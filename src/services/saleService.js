const { insertNewSaleProduct,
  getAllSaleDetails, getSaleDetailsById } = require('../models/saleModel');
const {
  insertSQLSale,
  deleteFromDBById,
  updateDBById,
} = require('../models/saleModel');
const { validateSales } = require('../middlewares/validateSales');

const checkProductAvailability = async (sales) => {
  const saleProduct = await Promise.all(
    sales.map(({ productId }) => getSaleDetailsById(productId)),
  );
  return saleProduct.some((size) => !size.length);
};

const insertNewSale = async (sales) => {
  const testSales = sales.map((sale) => validateSales(sale));
   const error = testSales.filter((errortype) => errortype.type)[0];
  if (error) {
   const response = error.message.indexOf('greater') !== -1
       ? { type: 422, message: error.message }
       : { type: 400, message: error.message };
   return response;
  } if (await checkProductAvailability(sales)) {
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

const updateSaleService = async (id, sales) => {
const details = await getSaleDetailsById(id);
 if (!details.length) return { type: 404, message: 'Sale not found' };
  const testSales = sales.map((sale) => validateSales(sale));
    const firstError = testSales.filter((errortype) => errortype.type)[0];
 if (firstError) {
   const response = firstError.message.indexOf('greater') !== -1
       ? { type: 422, message: firstError.message }
     : { type: 400, message: firstError.message };
   return response;
 }
  if (await checkProductAvailability(sales)) return { type: 404, message: 'Product not found' };
  await updateDBById(id);
   // testando o promise.allSettled, vi infos sobre ele nos sites stackOverFlow && chatGPT.
   const products = await Promise.allSettled(
     sales.map((sale) => insertNewSaleProduct(id, sale)),
   ).then((results) =>
     results.filter((result) => result.status === 'fulfilled').map((result) => result.value));
  const result = { saleId: id, itemsUpdated: products };
  return { message: result };
};

module.exports = {
  insertNewSale,
  searchById,
  searchAllSales,
  removeFromDB,
  updateSaleService,
};
