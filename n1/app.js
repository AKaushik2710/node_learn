const http = require('http');
const path = require('path');
const fs = require('fs');

const render = (res, filepath)=>{
	const pathFile = path.join(__dirname, filepath);
	fs.readFile(pathFile, (err, pathFiles)=>{
		res.writeHead(200, {'Content-Type':'text/html'});
		res.end(pathFiles);
	})
}

const server = http.createServer((req, res)=>{
	const url = req.url;
	if(url === '/'){
		render(res, 'index.html');
	}
	else if(url == '/prod'){
		render(res, 'product.html');
	}
	
})

server.listen(3000, ()=>{console.log('hu')});
