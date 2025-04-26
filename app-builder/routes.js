const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const router = express.Router();
const data = require('./pages/data.js');

function reqFile(res, file){
	return res.sendFile(path.resolve(__dirname, 'pages', file));
}

router.get('/',(req,res)=>{
	reqFile(res, 'index.html');
})

router.get('/find', (req,res)=>{
	reqFile(res, 'find.html');
})

router.post('/finds', (req, res)=>{
	res.writeHead(200,{'Location' : '/finds'});
	const {tag} = req.body;
	const record = {id : data.length, tag : tag};
//	fs.writeFile('./pages/data.js', record, {flag : 'a'});
	res.send(`${data.map(d =>{`<p>${d.tag}</p>`})}`);

console.log(req.body);
})

module.exports = router;
