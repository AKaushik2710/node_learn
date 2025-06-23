const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
require('dotenv').config();
const app = express();
const Note = require('./model');

connectDB(process.env.uri);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.get('/', async(req,res)=>{
    console.log(req.body);
    const data = await Note.find();
    res.status(200).json(data);
})

app.post('/',async(req,res)=>{
    const {heading, message} = req.body;
    const note = new Note({title: heading, content: message});
    const save = await note.save();
    console.log(req.body);
})


app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})