const mongoose = require('mongoose');
const express = require('express');
const app = express()
require('dotenv').config();
const {MongoClient} = require('mongodb');
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

const mongoClient = new MongoClient(process.env.uri);
let db, taskCol;
const mongoConnect = async()=>{
    try{
        await mongoClient.connect();
        db = mongoClient.db("aman");
        taskCol = db.collection("task");
    }
    catch(err){
        console.error(err)
    }
}

mongoConnect();
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
    const task = req.body;
    const result = await taskCol.insertOne(task);
    // const data  = await Task.create(req.body);
    res.status(201).json({result});
})

app.listen(3000, ()=>{
    console.log("Running");
})