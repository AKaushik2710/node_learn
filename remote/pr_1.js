const http = require('http');
const fs = require('fs');
const path = require('path');

function filePath(filename, res){
    return fs.readFile(path.join(__dirname, 'pages', filename), (err, data) => {
        if(err){
            console.log(err);
            return '<h1>File not found</h1>';
        }
        return res.end(data);
    });
}

const server =  http.createServer((req,res)=>{
    const url = req.url;
    const method = req.method;

    if(url === '/'){
        res.writeHead(200, {'Content-Type' : 'text/html'});
        filePath('index.html', res);
    }
    else if(url === '/kids'){
        res.writeHead(200, {'Content-Type' : 'text/html'});
        filePath('kids.html', res);
    }
    else if(url === '/men'){
        res.writeHead(200, {'Content-Type' : 'text/html'});
        filePath('men.html', res);
    }
    else if(url === '/women'){
        res.writeHead(200, {'Content-Type' : 'text/html'});
        filePath('women.html', res);
    }
    else if(url === '/contact'){
        // if(method === 'POST'){
        //     // const {name, gender, message} = req.body;

        //     // const data = `Name: ${name} \nGender: ${gender} \nMessage: ${message}`;
        //     // fs.writeFile(filePath('contact.txt'), data, (err) => {
        //     //     if(err){
        //     //         console.log(err);
        //     //         res.writeHead(500, {'Content-Type' : 'text/html'});
        //     //         res.write('<h1>Internal Server Error</h1>');
        //     //         return res.end();
        //     //     }
        //     //     res.writeHead(200, {'Content-Type' : 'text/html'});
        //     //     res.write('<h1>Form submitted successfully</h1>');
        //     //     return res.end();
        //     // });
        //     fs.writeFileSync(path.join(__dirname, 'pages', 'contact.txt'), JSON.stringify(req.body), (err) => {
        //         if(err){
        //             console.log(err);
        //         }
        //     });

        //     fs.writeHead(302, {'Location' : '/'});
        //     return res.end();
        // }
        if(url === '/contact' && method === 'POST'){
            res.writeHead(200, {'Content-Type' : 'text/html'});
            res.write('<h1>Form submitted successfully</h1>');
            return res.end();
        }
        else{
            res.writeHead(200, {'Content-Type' : 'text/html'});
            filePath('contact.html', res);
        }
    }
    // else if(url === '/contact' && method === 'POST'){
        
    // }
    else{
        res.writeHead(404, {'Content-Type' : 'text/html'});
        res.write('<h1>404 Not Found</h1>');
        res.end();
    }

})

server.listen(3001);