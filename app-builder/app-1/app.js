require('dotenv').config({path : '../.env'});
const express = require('express');
const router = express.Router();
const connectDB = require('./db');
let db, collection
connectDB(process.env.uri)
.then(()=>{
})

const TaskSchema = new 
