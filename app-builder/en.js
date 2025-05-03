const express = require('express');
const app = express();
const {MongoClient} = require('mongodb');
require("dotenv").config()

app.use(express.urlencoded({extended : true}));
app.use(express.json());
const client =  new MongoClient(process.env.uri)

let myCollection, data;
const run = async ()=>{
    try{
        await client.connect();
        console.log("Successfully Connected");

        const db = client.db("testdb");
         myCollection = db.collection("users");

        await myCollection.insertOne({name : "Aman", message : "Hello"});

        data = await myCollection.find().toArray();

        console.log(data);
    }
    catch(err){
        console.log(err);
    }
}

run()

app.get('/',(req,res)=>{
    res.send("Hello");
})
app.put('/', async (req, res)=>{
    console.log(req.body);
    const update = req.body;
    const name = req.body.name;

    await myCollection.updateOne({name : name}, {$set : update});
    res.send(update)
})

app.delete('/',async (req, res)=>{
    const del = data[0]._id;
    await myCollection.deleteOne({_id : del});
    res.end();
})

app.listen(3000, ()=>{
    console.log("Running")
})