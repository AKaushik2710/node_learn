const { MongoClient} = require('mongodb');
require('dotenv').config()
console.log("Dot is  ",process.env.uri)

const uri = process.env.uri;
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri);

async function run() {
  try {
//     // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("aman").command({ ping: 1 });
    gets = await client.db("aman").collection("db_learn").find().toArray();
    console.log(gets)
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
//     // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch("something went wrong");

// Mongoose Way
const mongoose = require('mongoose')

mongoose.connect(uri).then(()=>console.log("connected")).catch((err)=>console.log(err))