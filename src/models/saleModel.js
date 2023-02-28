const connection = require('./conection');

const insertNewSaleProduct = async (saleId, { productId, quantity }) => {
  await connection.execute(
    `INSERT INTO StoreManager.sales_products 
      (sale_id, product_id, quantity) VALUE (?, ?, ?)`,
    [saleId, productId, quantity],
  );
  return { productId, quantity };
};

const insertSQLSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUE (?)',
    [new Date()],
  );
  return { insertId };
};

module.exports = {
  insertSQLSale,
  insertNewSaleProduct,
};
