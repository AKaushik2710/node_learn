require('dotenv').config({path : '../.env'});
const express = require('express');
const app = express();
const controller = require('./controllers/controller');
const connectDB = require('./db/db');
const path = require('path')

const run = async()=>{
    try{
        await connectDB(process.env.uri)
        console.log("-------");
    }
    catch(err){
        console.log(".........");
    }
}

run();
app.use(express.static('./public'));
app.use(express.urlencoded({extended : true}));
app.use(express.json())

app.use('/api', controller);
app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname,'public', 'index.html'))
})
app.listen(3000,()=>{
    console.log("Server is running.")
})