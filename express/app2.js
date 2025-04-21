const express = require('express');
const path =  require('path');
const app = express();



app.get('/', (req, res)=>{
const filePath = path.join(__dirname, 'pages', 'index.html');
res.sendFile(filePath);
})

app.listen(3000);
