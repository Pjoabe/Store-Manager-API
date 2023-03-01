const connection = require('./conection');

const getAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return result;
};

const getById = async (id) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return result;
};

const insertSQL = async (name) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUE (?)',
    [name],
  );

  return insertId;
};

const updateSQL = async (id, name) => {
  const [result] = await connection.execute(
    'UPDATE StoreManager.products SET name = (?) WHERE id = (?)',
    [name, id],
  );

  return result;
};

const removeSQL = async (id) => {
  const [result] = await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = (?)',
    [id],
  );

  return result;
};

module.exports = {
   getAll,
   getById,
  insertSQL,
  updateSQL,
   removeSQL,
};
