const Products = require('../models/productsModel');
const { mongooseToObject } = require('../../util/mongoose');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class ProductsController {
    ShowAllProducts(req, res, next) {
        Products.find({})
            .then(products => {
                res.json({
                    products: mutipleMongooseToObject(products)
                });
            })
            .catch(next);
    }
    ShowProductBySlug(req, res, next) {
        Products.findOne({ slug: req.params.slug })
            .then(products => {
                res.json({ products: mongooseToObject(products) });
            })
            .catch(next);
    }
    ShowProductById(req, res, next) {
        Products.findOne({ _id: req.params.id })
            .then(products => {
                res.json({ products: mongooseToObject(products) });
            })
            .catch(next);
    }
    ShowProductByCategory(req, res, next) {
        Products.find({idcate:req.query.idcate})
            .then(products => {
                res.json({
                    products: mutipleMongooseToObject(products)
                });
            })
            .catch(next);
    }
    ShowTrashProduct(req, res, next) {
        Products.findDeleted({})
            .then(trash => {
                res.json({
                    trash: mutipleMongooseToObject(trash)
                });
            })
            .catch(next);
    }
    AddProduct(req, res, next) {
        const pros = new Products(req.body);
        pros.save()
            .then(() => res.json("Thêm thành công!"))
            .catch(error => {
                res.json(error)
            });
    }
    EditProduct(req, res, next) {
        Products.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.json("Cập nhật thành công!"))
            .catch(next);
    }
    ForceDeleteProduct(req, res, next) {
        Products.deleteOne({ _id: req.params.id })
            .then(() => res.json("Xóa thành công!"))
            .catch(next);
    }
    DeleteProduct(req, res, next) {
        Products.delete({ _id: req.params.id })
            .then(() => res.json("Xóa tạm thành công!"))
            .catch(next);
    }
    RestoreProduct(req, res, next) {
        Products.restore({ _id: req.params.id })
            .then(() => res.json("Khôi phục thành công!"))
            .catch(next);
    }
    DecreaseProduct(req, res, next) {
        const sort = { _id: -1 };
        Products.find({}).sort(sort)
            .then(product => {
                res.json({
                    product: mutipleMongooseToObject(product)
                });
            })
            .catch(next);
    }
    AscendingProduct(req, res, next) {
        const sort = { _id: 1 };
        Products.find({}).sort(sort)
            .then(product => {
                res.json({
                    product: mutipleMongooseToObject(product)
                });
            })
            .catch(next);
    }
    MaxProduct(req, res, next) {
        const sort = { name: -1 };
        Products.find({}).sort(sort).limit(1)
            .then(product => {
                res.json({
                    product: mutipleMongooseToObject(product)
                });
            })
            .catch(next);
    }
    MinProduct(req, res, next) {
        const sort = { name: 1 };
        Products.find({}).sort(sort).limit(1)
            .then(product => {
                res.json({
                    product: mutipleMongooseToObject(product)
                });
            })
            .catch(next);
    }
}

module.exports = new ProductsController();