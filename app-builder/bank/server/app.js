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

app.post('/balance', async(req, res)=>{
    const {account} = req.body;
    const q = 'SELECT balance FROM BANK WHERE name = ?';
    db.query(q, account, (err, data)=>{
        if(err){
            res.status(400).json({error : 'Could not fetch balance'});
        }
        console.log(data);
        res.status(200).json(data);
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
        else{
            console.log(data);
            res.status(200).json(data);
        }
    })
})
app.post('/deposit', async(req, res)=>{
    const {amount, account} = req.body;
    const q = 'UPDATE BANK SET balance = balance + ? WHERE name = ?';
    const parseAmount = parseFloat(amount);
    db.query(q, [parseAmount, account], (err, data)=>{
        if(err){
            console.log(err.cause);
            res.status(400).json({error : 'Deposit failed'});
        }
        res.status(200).json(data);
    })
});

app.post('/withdraw', async(req, res)=>{
    const {amount, account} = req.body;
    console.log(amount, account);
    const q = 'UPDATE BANK SET balance = balance - ? WHERE name = ?';
    const parseAmount = parseFloat(amount);
    db.query(q, [parseAmount, account], (err, data)=>{
        if(err){
            console.log(err.cause);
            res.status(400).json({error : 'Withdraw failed'});
        }
        res.status(200).json(data);
    })
});

app.post('/transfer', async(req, res)=>{
    const {to, amount, from} = req.body;
    const q1 = 'UPDATE BANK SET balance = balance - ? WHERE name = ?';
    const q2 = 'UPDATE BANK SET balance = balance + ? WHERE name = ?';
    const parseAmount = parseFloat(amount);
    console.log(to, amount, from);
    // let result = [true, true];
    let exists;
    db.query('SELECT name FROM BANK WHERE name = ?', to, (err, data)=>{
        if(err){
            exists = false;
            console.log(exists);
        }
        else{
            exists = true;
            if(exists){
        db.query(q1, [parseAmount, from], (err, data)=>{
            if(err){
                console.log(err.cause);
                exists=false;
                res.status(400).json({error : "Insufficient Balance"});
            }
        })

        db.query(q2, [parseAmount, to], (err, data)=>{
            if(err){
                console.log(err.cause);
            }
        })

        res.status(200).json(data);
    }
    else{
        res.status(404).json({error : "Receiver not found"});
    }
        }
    })
    
})

app.listen(process.env.PORT, ()=>console.log("running"));