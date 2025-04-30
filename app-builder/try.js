const data = require('./pages/data');
const express = require('express');
const app = express();
//const path = require('path');
//const fs = require('fs');
const routes = require('./routes');
const api = require('./api')

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/', routes);
app.use('/api', api);

app.listen(4430);
