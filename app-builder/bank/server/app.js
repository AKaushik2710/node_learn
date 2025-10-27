const express = require('express');
const app = express();
const db = require('./db');
const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/login', async (req, res)=>{
    const { name, balance} = req.body;
})
app.get('/balance', (req, res)=>{

})