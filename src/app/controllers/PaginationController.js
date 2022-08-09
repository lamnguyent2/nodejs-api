const Products = require('../models/productsModel');
const { mongooseToObject } = require('../../util/mongoose');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class PaginationController {
    PaginationProducts(req, res, next) {
        let perPage = 3;
        let page = req.params.page || 1;

        Products.find().skip((perPage * page) - perPage).limit(perPage).exec((err, products) => {
            Products.countDocuments((err, count) => {
                if (err) return next(err);
                res.json(products)
            });
        });
    }
}

module.exports = new PaginationController();