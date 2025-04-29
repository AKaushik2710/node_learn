const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const router = express.Router();
const data = require('./pages/data.js');

function remover(e){
	data.filter(d => {return d.id!==e })
}

function reqFile(res, file){
	return res.sendFile(path.resolve(__dirname, 'pages', file));
}

router.get('/',(req,res)=>{
	reqFile(res, 'index.html');
})

router.get('/find', (req,res)=>{
	reqFile(res, 'find.html');
})

router.post('/find', (req, res)=>{
	// res.writeHead(200,{'Location' : '/finds'});
	const {tag} = req.body;
	const record = {id : data.length, tag : tag};
	data.push(record)
//	fs.writeFile('./pages/data.js', record, {flag : 'a'});
	res.send(`<div>${data.map(d =>{ return `<p>${d.tag}<span id="${d.id}" onClick="remover(${d.id})">del</span></p>`})}</div>`);

console.log(req.body, data, `<div>${data.map(d =>{`<p>${d.tag}</p>`})}</div>`);
})

// router.delete('/find/:id')


router.get('/', (req,res)=>{
	res.send(`${data.map(d =>{`<p>${d.tag}</p>`})}`);
})

module.exports = router;
