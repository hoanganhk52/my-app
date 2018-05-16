const express = require('express');
const hbs = require('hbs');
const app = express();
const fs = require('fs');
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs');
});

app.get('/about', (req, res) => {
    res.render('about.hbs');
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
