const express = require('express');
const { productController } = require('../controllers');

const { nameValidation } = require('../middlewares/nameValidation');

const router = express.Router();

router.get('/', productController.getAllProducts);

router.get('/search', productController.searchProductByName);

router.get('/:id', productController.getProductById);

router.post('/', nameValidation, productController.newProduct);

router.put('/:id', nameValidation, productController.updateProductByName);

router.delete('/:id', productController.deleteProductById);

module.exports = router;
