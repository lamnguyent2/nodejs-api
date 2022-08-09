const express = require('express');
const router = express.Router();
const ProductsController = require('../app/controllers/ProductsController');
const FilterController = require('../app/controllers/FiltersController');
const PaginationController = require('../app/controllers/PaginationController');

router.get('/', ProductsController.ShowAllProducts);
router.get('/decrease', ProductsController.DecreaseProduct);
router.get('/ascending', ProductsController.AscendingProduct);
router.get('/max', ProductsController.MaxProduct);
router.get('/min', ProductsController.MinProduct);
router.get('/pagination/:page', PaginationController.PaginationProducts);
router.get('/filter', FilterController.FilterProducts);
router.get('/trash', ProductsController.ShowTrashProduct);
router.get('/:slug', ProductsController.ShowProductBySlug);
router.post('/category', ProductsController.ShowProductByCategory);
router.get('/product/:id', ProductsController.ShowProductById);
router.post('/add', ProductsController.AddProduct);
router.put('/:id/edit', ProductsController.EditProduct);
router.delete('/:id/delete', ProductsController.DeleteProduct);
router.delete('/:id/delete-force', ProductsController.ForceDeleteProduct);
router.patch('/:id/restore', ProductsController.RestoreProduct);


module.exports = router;