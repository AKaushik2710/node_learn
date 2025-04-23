const http =  require('http');
const fs = require('fs');
const path = require('path');
const serverFn = require('./serverFn.js');

const server = http.createServer(serverFn);

server.listen(3002);