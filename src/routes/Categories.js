const express = require('express');
const router = express.Router();
const CatalogController = require('../app/controllers/CategoriesController');

router.get('/show', CatalogController.ShowAllCategories);
router.post('/add', CatalogController.AddCategory);
router.put('/:id/edit', CatalogController.EditCategory);
router.delete('/delete/:id', CatalogController.DeleteCategory);

module.exports = router;