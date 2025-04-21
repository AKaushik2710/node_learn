const express = require('express');
const path =  require('path');
const app = express();
const fs = require('fs');
function fileSender(res,folders='', filename){
return res.sendFile(path.join(__dirname,folders,filename)); 
}
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res)=>{
const filePath = path.join(__dirname, 'pages', 'index.html');
fileSender(res,'pages','index.html');
})

app.get('/contact',(req,res)=>{
fileSender(res, 'pages', 'contact.html');
})

app.post('/contact',(req, res)=>{
const {name, email, message} = req.body;
const fileData = ` Mr. ${name}, your ${message} has been recieved from via ${email}. `;

fs.writeFile('contact.txt', fileData,(err)=>{
res.send("Thsnks for this");
})
})
app.listen(3000);
