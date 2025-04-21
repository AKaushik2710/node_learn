const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'css')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res)=>{
res.sendFile(path.join(__dirname, "pages","index.html"));
});

app.get('/prod',(req,res)=>{
res.sendFile(path.join(__dirname, "pages","product.html"));
});

app.get('/contact', (req,res)=>{
res.sendFile(path.join(__dirname, "pages", "contact.html"));
})

app.post('/contact', (req,res)=>{
const {name, email, message} = req.body;
console.log(`message : ${message}`);

res.send(`<h2>Thanks ${name} for sending. Do confirm if it's sent by you via<br> E-mail : ${email}<br> Message : ${message}</h2>`);
})

app.use((req,res)=>{
res.status(404).send("Page Not Found");
});

app.listen(3000);
