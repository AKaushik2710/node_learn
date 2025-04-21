const express = require('express');
const router = express.Router();
const path = require('path');

let messageArr =  [{id :1, name : "A", message : "m"}, {id : 2, name : "a", message : "n"}];

router.get('/messages', (req,res)=>{
res.sendFile(path.join(__dirname,'..','pages','message.html'));
})

router.post('/messages', (req, res)=>{
const {name, message} = req.body;
const newMessage = {id : messageArr.length+1, name : name, message : message};
messageArr.push(newMessage);
res.status(201).json(messageArr);
})

module.exports = router;
