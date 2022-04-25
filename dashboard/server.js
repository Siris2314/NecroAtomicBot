const express = require('express');
const app = express();

const index = require('../index');










app.set('views', __dirname + '/views');
app.set('view engine','pug')
app.get('/', (req, res) => {
    res.render('index')})
app.get('/commands', (req, res) => {
    res.render('commands', {
        subtitle: 'Commands',
        categories:[{name: 'Administration', icon:'fas fa-gavel'},
        {name:'Fun', icon:'fas fa-party-horn'},
        {name:'Gameinfo', icon:'fas fa-gamepad'}, 
        {name:'Images',icon:'fas fa-image'},
        {name:'Levels', icon:'fas fa-laptop-code'},
        {name:'Utility', icon:'fas fa-screwdriver-wrench'}]
    })})
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
