const Catalog = require('../models/categoriesModel');
const Products = require('../models/productsModel');
const { mongooseToObject } = require('../../util/mongoose');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class CatalogController {
    ShowAllCategories(req, res, next) {
        Catalog.find({})
            .then(catalogs => {
                res.json({
                    catalogs: mutipleMongooseToObject(catalogs)
                });
            })
            .catch(next);
    }
    AddCategory(req, res, next) {
        const cates = new Catalog(req.body);
        cates.save()
            .then(() => res.json("Thêm thành công!"))
            .catch(error => {
                res.json(error)
            });
    }
    EditCategory(req, res, next) {
        Catalog.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.json("Cập nhật thành công!"))
            .catch(next);
    }
    DeleteCategory(req, res, next) {
        Products.find({idcate:req.params.id},function(err, product){
            if(product.length===0){
                Catalog.deleteOne({ _id: req.params.id })
                .then(() => res.json("Xóa thành công!"))
                .catch(next);  
            }else{
                res.json("Category đã có product");
            }
        })
    }
}

module.exports = new CatalogController();