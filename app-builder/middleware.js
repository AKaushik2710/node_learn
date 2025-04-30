const express = require('express');
const app = express();
const logger = require('./mid/logger');
const auth = require('./mid/authorize');

app.use([logger, auth]);

app.get('/', (req, res)=>{
    res.send('Home')
})

app.get('/about', (req,res)=>{
    res.send('About');
})

app.listen(5000);