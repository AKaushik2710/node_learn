const express = require('express');
const router = express.Router();
const path = require('path');

let messages = [
    { id: 1, name: "Alice", message: "Hello from Alice!" },
    { id: 2, name: "Bob", message: "Yo this is Bob." }
  ];

  
router.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, 'pages', 'api.html'));
})

router.get('/messages', (req,res)=>{
    res.json(messages);
})

router.post('/message', (req, res)=>{
    const {name, message} = req.body;

    const newMessage = {id : messages.length+1, name : name, message : message};

    messages.push(newMessage);

    res.json(messages);
})

router.put('/message', (req,res)=>{
    const {id, message} = req.body;

    messages.find(m=> m.id === parseInt(id)).message=message;

    res.json(messages);
})

module.exports = router;