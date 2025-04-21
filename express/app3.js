const express =  require('express');
const app = express();
const routedPages = require('./routes/pages');
const path = require('path');
const routedAPI = require('./routes/api');

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'css')));

app.use('/', routedPages);
app.use('/api', routedAPI);

app.use((req,res)=>{
res.status(404);
})

app.listen(3000);
