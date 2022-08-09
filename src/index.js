const express = require('express');
const path = require('path');
const morgan = require('morgan');
const db = require('./config/db');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// const methodOverride = require('method-override');
const handlebars = require('express-handlebars');
const route = require('./routes/index');

// connect database
db.connect();
const app = express(); //Framework
require('./config/db/passport');
const port = process.env.PORT || 4200

// public
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* app.use(validator()); */
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  express.urlencoded({
    extended: true,
  }
  ));
app.use(express.json());

// app.use(methodOverride('_method'));

// Template engine
// app.engine('hbs', handlebars({
//   extname: '.hbs'
// }));
// app.set('view engine', 'hbs');
// app.set('views', path.join(__dirname, 'resources/views'));

// Routes init
route(app);

//127.0.0.1 - http://localhost:3000

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

//package.json
/* "watch": "node-sass --watch src/resources/scss/ --output src/public/css/", */