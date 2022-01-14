const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.set('views', __dirname + '/views');
app.set('view engine','pug')
app.get('/', (req, res) => {
    res.render('index')})
app.get('/commands', (req, res) => {
    res.render('commands')})
app.listen(port, () => console.log(`Listening on port ${port}`));
