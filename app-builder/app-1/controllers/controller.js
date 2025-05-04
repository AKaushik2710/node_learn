const express = require('express');
const router = express.Router();

let collection = [];
router.post('/', (req,res)=>{
    const task = req.body;
    collection.push(task);
    res.send(task);
    console.log(task);
})

router.get('/', (req,res)=>{
    res.send(`${collection.map(c => {return `<p>${c.name}, ${c.task}/p>`})}`)
})

module.exports = router;