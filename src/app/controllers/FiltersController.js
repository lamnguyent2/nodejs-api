const Products = require('../models/productsModel');
const { mongooseToObject } = require('../../util/mongoose');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class FilterController {
    FilterProducts(req, res, next) {
        const filters = req.query.name;
        const filters2 = req.query.slug;
        if(filters){
            const q = filters?.replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/g, '\\$&');
            Products.fuzzySearch(q, function (error, name) {
                if (error) {
                    res.json({error: error})
                }
                res.json({
                    name: mutipleMongooseToObject(name)
                })
            });
        }else if(filters2){
            const q = filters2?.replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/g, '\\$&');
            Products.fuzzySearch(q, function (error, slug) {
                if (error) {
                    res.json({error: error})
                }
                res.json({
                    slug: mutipleMongooseToObject(slug)
                })
            });
        }
    }
}

module.exports = new FilterController();