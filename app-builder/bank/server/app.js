const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const dotenv = require('dotenv');
dotenv.config();
const db = require('./db');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/login', async (req, res)=>{
    const { name} = req.body;
    console.log(name);
    const q = 'SELECT * FROM BANK WHERE name = ?';
    db.query(q, name, (err, data)=>{
        if(err){
            res.status(400).json({ error: 'Login failed' });
        }
        if(data.length === 0) res.status(404).json({ error: 'User not found' });
        else res.status(200).json(data);
    })
})

app.post('/register', async(req, res)=>{
    const {name, balance} = req.body;
    const q = 'INSERT INTO BANK (name, balance) VALUES(?, ?)';
    console.log(typeof name, typeof balance);
    const parseBalance = parseFloat(balance);
    db.query(q, [name, parseBalance], (err, data)=>{
        if(err){
            console.log(err.cause);
            res.status(400).json({error : 'Registration failed'});
        }
        else res.status(200).json(data);
    })
})
app.get('/balance', (req, res)=>{

})

app.listen(process.env.PORT, ()=>console.log("running"));