const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongoosedelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');

mongoose.plugin(slug);
const Schema = mongoose.Schema;


const Products = new Schema(
    {
        _id: { type: Number },
        name: { type: String },
        idcate: { type: Number },
        slug: { type: String, slug: 'name', unique: true }
    }, 
    {
        _id: false,
        timestamps: true,
    }
);

Products.plugin(AutoIncrement);

Products.plugin(mongoose_fuzzy_searching, { 
    fields: ['name', 'slug'] 
});

// mongoose delete plugin
Products.plugin(mongoosedelete, { 
    deletedAt : true,
    overrideMethods: 'all' 
});

module.exports = mongoose.model('Products', Products);