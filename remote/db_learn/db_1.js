const mongoose = require('mongoose');
const express = require('express');
const app = express();
const key = 'mongodb+srv://aman:qwe123@mycluster.ma5iar8.mongodb.net/?retryWrites=true&w=majority&appName=myCluster'

app.use(express.urlencoded({extended : true}));
app.use(express.json())

const connectDB = async ()=>{
    try{
        await mongoose.connect(key);
        console.log("Connected");
    }
    catch(err){
        console.log("Error occured", err);
    }
}

connectDB();

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    age : {
        type : Number,
        required : true,
        default : 18
    }
}, {timestamps : true});

const User = mongoose.model('User', userSchema);

app.post('/users',async(req,res)=>{
    try{
        const user = new User(req.body);
        const save = await user.save();
        res.status(200).json(save);
    }
    catch(err){
        console.log(err);
    }
})

app.get('/users', async(req, res)=>{
    const reply = await User.find();
    res.status(200).json(reply);
})

app.put('/users', async(req, res)=>{
    const update=req.body;
    const id = update._id;
    const change = await User.findByIdAndUpdate(id, update);
    res.status(200).json(change);
})

app.delete('/users', async (req,res)=>{
    const deleteID = req.body._id;
    const deleted = await User.findByIdAndDelete(deleteID);
    res.status(200).json(deleted);
})

app.listen(3000, ()=>{console.log("error")});