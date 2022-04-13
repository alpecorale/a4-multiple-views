const port = 3001,
    express = require('express'),
    morgan = require('morgan'),
    app = express();
require('dotenv').config();

const {response, request} = require("express");


app.listen(process.env.PORT || port);


//register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));


// serve up static files in the directory public
app.use(express.static('public'));
app.use((req,res,next) => {
    res.locals.path = req.path;
    next();
});


app.get('/', (req,res) => {
    res.redirect('/index');
})

app.get('/index', async (req, res) => {

    res.render('index');

});

// 404 page
app.use((req,res) => {
    res.status(404).render('404',{title: '404'})
})
