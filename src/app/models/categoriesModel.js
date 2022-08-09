const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongoosedelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

mongoose.plugin(slug);
const Schema = mongoose.Schema;


const Catalog = new Schema(
    {
        _id: { type: Number },
        namecate: { type: String },
    }, 
    {
        _id: false,
        timestamps: true,
    }
);

Catalog.plugin(AutoIncrement, {id: 'id_cate'});

// mongoose delete plugin
Catalog.plugin(mongoosedelete, { 
    deletedAt : true,
    overrideMethods: 'all' 
});

module.exports = mongoose.model('Catalog', Catalog);