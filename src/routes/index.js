const productsRouter = require('./Products')
const usersRouter = require('./Users')
const catalogsRouter = require('./Categories')

function route(app) {
    app.use('/', productsRouter);
    app.use('/auth', usersRouter);
    app.use('/catalog', catalogsRouter);
}

module.exports = route;