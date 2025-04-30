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

// 
router.get('/messages/:messageID', (req,res)=>{
    console.log(req.params)
    const {messageID} = req.params;

    const myMessage = messages.find(m=> m.id === Number(messageID));
    if(!myMessage){
        res.status(404).send("Page Not Found");
    }
    else{
        res.send(`${myMessage.name}'s to the world is ${myMessage.message}`)
    }
})

router.get('/messages/v1/query',(req,res)=>{
    console.log('Im here')
    const {search, limit} = req.query;

    let queriedProducts = [...messages];

    if(search){
        queriedProducts = queriedProducts.filter(q =>{
            return q.name.startsWith(search);
        });
    }
    if(limit){
        queriedProducts = queriedProducts.slice(0,Number(limit));
    }
    if(!queriedProducts){
        return res.status(200).json({"success" : "true", "result" : "Not found"});
    }
    res.status(200).json(queriedProducts);
})

router.post('/message', (req, res)=>{
    const {name, message} = req.body;

    const newMessage = {id : messages.length+1, name : name, message : message};

    messages.push(newMessage);

    res.json(messages);
})

router.put('/message/postman/:id', (req,res)=>{
    const {id} = req.params;
    console.log(req.body);
    const { message} = req.body;

    messages.find(m=> m.id === parseInt(id)).message=message;

    res.json(messages);
})

router.delete('/message/postman/:id',(req,res)=>{
    const {id} = req.params;

    
    messages = messages.filter(m => {return m.id !== parseInt(id)});

    res.json(messages);
})


module.exports = router;