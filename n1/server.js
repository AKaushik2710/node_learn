const http = require('http');

const server = http.createServer((req,res)=>{
	const url = req.url;
	if (url === '/'){
		res.writeHead(200, {'Content-Type' : 'text/plain'});
		res.end('hello');
	}
	else if (url === '/product'){
		res.writeHead(200, {'Content-Type' : 'text/plain'});
		res.end('Product Page');
	}
	else{
		res.writeHead(404, {'Content-Type' : 'text/plain'});
		res.end('Not Found');
	}
})

server.listen(3000, ()=>{
	console.log("It;s mae");
})
