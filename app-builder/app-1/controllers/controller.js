const express = require('express');
const router = express.Router();
const Task = require('../models/model');

let collection = [];
router.post('/', async (req,res)=>{
    const task = req.body;
    // collection.push(task);
    const createTask = await Task.create(task);
    res.send(task);
    console.log(task);
})

router.get('/', async (req,res)=>{
    const tasks = await Task.find();
    console.log(tasks);
    res.send(tasks);
})

router.delete('/:id',async(req, res)=>{
    const {id} = req.params;
    const del = await Task.findByIdAndDelete(id);
    console.log("Done");
})
module.exports = router;