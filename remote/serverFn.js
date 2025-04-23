const fs = require('fs');
const path = require('path');

function server(req,res){
    const url = req.url;
    const method = req.method;

    function filePath(filename, res){
        return fs.readFile(path.join(__dirname, 'pages', filename), (err,data)=>{
            if(err){
                console.log(err);
            }
            res.writeHead(200, {'Content-Type' : 'text/html'});
            res.end(data);
        })
    }
    if(url === '/'){
        filePath('calc_index.html', res);
    }
    else if(url === '/calc-form'){
        filePath('calc_form.html', res);
    }
    else if(url === '/calc-result' && method === 'POST'){
        let body = [];
        req.on('data', chunk=>{body.push(chunk)});
        req.on('end', ()=>{
            const parsedBody = Buffer.concat(body).toString();
            const params = new URLSearchParams(parsedBody);

            const bodyObj = {};
            for (const [key,value] of params.entries()){
                bodyObj[key] = value;
            }
            const Sum = parseInt(bodyObj['num1']) + parseInt(bodyObj['num2']);
            res.writeHead(200, {'Content-Type' : 'text/html'});
            res.write(`<h1>Calculation Result : ${Sum}</h1>`);
            res.end();
        })
        // filePath('calc_result.html', res);
    }
    else{
        res.writeHead(404, {'Content-Type' : 'text/html'});
        res.write('<h1>Page Not Found</h1>');
        res.end();
    }
}

module.exports = server;