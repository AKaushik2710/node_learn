const http = require('http');

const server = http.createServer((req, res) => {
    console.log( req.url, req.method);
    res.writeHead(200, {'Content-Type' : 'text/html'});
    res.write(`</h1>${req.url}</h1>`);
    res.write(`<h1>${req.method}</h1>`);
    res.write(`<h1>${req.headers['user-agent']}</h1>`);
    res.end();
    // process.exit();
}).listen(3000);

// server.listen(3000);