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

const getAllSaleDetails = async () => {
  const [result] = await connection.execute(
    `SELECT saleProducts.sale_id as saleId,
        sales.date as date,
        saleProducts.product_id as productId,
        saleProducts.quantity as quantity
      FROM StoreManager.sales AS sales
      INNER JOIN StoreManager.sales_products as saleProducts ON saleProducts.sale_id = sales.id`,
  );
  return result;
};

const getSaleDetailsById = async (saleID) => {
  const [result] = await connection.execute(
    `SELECT
        sales.date as date,
        saleProducts.product_id as productId,
        saleProducts.quantity as quantity
      FROM StoreManager.sales AS sales
      INNER JOIN StoreManager.sales_products as saleProducts ON saleProducts.sale_id = sales.id
      WHERE id = ?`,
    [saleID],
  );
  return result;
};

const deleteFromDBById = async (id) => {
  await connection.execute('DELETE FROM StoreManager.sales WHERE id = ?', [id]);
};

module.exports = {
  insertSQLSale,
  insertNewSaleProduct,
  getAllSaleDetails,
  getSaleDetailsById,
  deleteFromDBById,
};
