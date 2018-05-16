const express = require('express');
const hbs = require('hbs');
const app = express();
const fs = require('fs');

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


// app.use((req, res, next) => {
//     let now = new Date().toString();
//     let log = `${now} ${req.method} ${req.url}`;
//     fs.appendFile('server.log', log + '\n', (err) => {
//         if (err) console.log('unable to append');
//     });
//     next();
// });

// app.use((req, res, next) => {
//     if ('maintain') res.render('maintain.hbs');
//     else next();
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website'
    });
});

app.listen(9999, () => {
    console.log('Server is up on port 9999');
});
