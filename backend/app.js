const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const usersRoutes = require('./routes/users');
const articleRoutes = require('./routes/articles');
const gifRoutes = require('./routes/gifs');
const auth = require('./middleware/auth');
const feedRoute = require('./routes/feeds');


app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use('/users', usersRoutes);
app.use('/articles', articleRoutes);
app.use('/gifs', gifRoutes);


module.exports = app;