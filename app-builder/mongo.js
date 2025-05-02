const mongoose = require('mongoose');
const express = require('express');
const app = express()
require('dotenv').config();

app.use(express.urlencoded({extended : true}));
app.use(express.json());
const client = async()=>{
    try{
        await mongoose.connect(process.env.uri);
    }
    catch(err){
        console.log("Error is :", err)
    }
}

client(process.env.uri)

const TaskSchema = new mongoose.Schema({
    name : String,
    completed : Boolean
})

const Task = mongoose.model('Task', TaskSchema);
app.get('/', (req, res)=>{
    res.send('hello');
})

app.post('/', async(req, res)=>{
    const data  = await Task.create(req.body);
    res.status(201).json({data});
})

app.listen(3000, ()=>{
    console.log("Running");
})