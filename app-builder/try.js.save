const data = require('./pages/data');
const express = require('express');
const app = express();
//const path = require('path');
//const fs = require('fs');
const routes = require('./routes');

app.use(express.urlencoded({extended:true}));
app.use('/', routes);

app.listen(4430, ()=> console.log('error'));
const str = data.map(e => {
return `Hello Can ${e.id} having tag : ${e.tag}`
});

console.log(str);
