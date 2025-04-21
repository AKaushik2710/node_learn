const express = require('express');
const path = require('path');
const router = express.Router();
const fs = require('fs');


function sentFile(res, dir, file){
return res.sendFile(path.join(__dirname, '..', dir, file));
}

router.get('/', (req, res)=>{
sentFile(res, 'pages', 'index.html');
})

router.get('/contact', (req,res)=>{
sentFile(res, 'pages', 'contact.html');
})

router.get('/product', (req,res)=>{
sentFile(res, 'pages', 'product.html');
})

router.post('/contact', (req,res)=>{
const  { name, email, message} = req.body;

const data = `Mr. ${name}, We have successfully received your message stating ${message}.\n Kindly make sure if it's your E-mail ID [${email}]`;

fs.appendFile('info.txt', data, (err)=>{
if(err){
console.log(err);
}
console.log(data);
res.send('<h1> Thank You for your Patreon</h1>');
})
})

module.exports=router;
