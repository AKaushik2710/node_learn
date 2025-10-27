const express = require('express');
const app = express();
require("dotenv").config();
const mongoose = require('mongoose');
// const notesConnection = mongoose.createConnection('mongodb://localhost:27017/notes');
mongoose.connect(process.env.uri);

const Note = mongoose.Schema({
    id : {
        type : String,
        unique : true,
        required : true
    },
    name : {
        type : String
    }
})

const myNote = mongoose.model('name', Note);
app.get('/',(req,res)=>{
    res.send("<a href='/himu'>Hello World</a>");
})
// app.get('/',(req,res)=>{
//     res.send("<form onSubmit={()=>{ const info = document.getElementById('info').value; }}><input type='text' name='info' id='info'/><button type='submit'>Sub</button></form>")
// })
app.get('/himu', (req,res)=>{
    res.send("Hello Himanshu");
})

app.listen(4000);