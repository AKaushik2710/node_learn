const mongoose = require('mongoose');
const express = require('express');
const app = express();
require('dotenv').config();
app.use(express.urlencoded({extended : true}));
app.use(express.json())

const connectDB = async (param)=>{
    const key = process.env.URI_FRONT+param+process.env.URI_BACK;
    try{
        await mongoose.connect(key);
        console.log("Connected");
    }
    catch(err){
        console.log("Error occured", err);
    }
}

connectDB("test");

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

const postSchema = new mongoose.Schema({
    postName : {
        type : String,
        required : true,
    },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
})
const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);

let userID=null;
app.post('/users',async(req,res)=>{
    try{
        const user = new User(req.body);
        const save = await user.save();
        userID = save._id;
        res.status(200).json(save);
    }
    catch(err){
        console.log(err);
    }
})
app.post('/users/post', async(req,res)=>{
    const data = req.body;
    data.author = userID;
    const saved = new Post(data);
    const save = await saved.save();
    res.status(200).json(save);
})

// app.get('/users/post', async(req,res)=>{
//     const data = await Post.find().populate('author');
//     res.status(200).json(data);
// })
app.get('/users/post', async (req, res) => {
    try {
        const posts = await Post.find().populate('author');
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch posts" });
    }
});

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

app.get('/users/post/find', async(req,res)=>{
    try{
    const {age} = req.body;
    const getter = await User.find({age : {$lt : age}});
    res.status(200).json(getter);
    }
    catch(err){
        res.status(400).json(err)
    }
})
app.delete('/users', async (req,res)=>{
    const deleteID = req.body._id;
    const deleted = await User.findByIdAndDelete(deleteID);
    res.status(200).json(deleted);
})

app.listen(3000, ()=>{console.log("error")});