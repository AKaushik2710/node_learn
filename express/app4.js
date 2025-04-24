const express = require('express');
const routedAPI = require('./routes/api2');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

app.use('/', routedAPI);

app.listen(3002);