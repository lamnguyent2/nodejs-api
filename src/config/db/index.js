const mongoose = require('mongoose');

// async là khai báo 1 hàm bất đồng bộ
async function connect() { 
    try {
        await mongoose.connect('mongodb+srv://lamnguyent2:Lam0123456z@cluster0.tlapj.mongodb.net/testdata', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connect successfully!');
    } catch (error) {
        console.log('Connect error!');
    }
}

module.exports = { connect };

//mongodb+srv://lamnguyent2:Lam0123456z@cluster0.tlapj.mongodb.net/asm_duan_dev
//mongodb://localhost:27017/asm_duan_dev
