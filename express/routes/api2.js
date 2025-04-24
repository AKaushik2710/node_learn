const express = require('express');
const path = require('path');
const router = express.Router();

const messages = [];
const renderFile = (res, fileName)=>{
    return res.sendFile(path.join(__dirname, '..', 'pages', fileName));
}

router.get('/', (req,res)=>{
    renderFile(res, 'index.html');
})

router.get('/contact-form', (req,res)=>{
    renderFile(res, 'contact.html');
})

router.post('/contact-form', (req,res)=>{
    const {name, email, message} = req.body;

    const data = `We have recieved Mr. ${name}'s message stating '${message}' via ${email}. `;
    messages.push({ name : name, email : email, messsage : message, data : data});
    res.send(`${messages.map(m => `<h3>${m.data}</h3>`)}`);
});

module.exports = router;