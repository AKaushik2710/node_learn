const path = require('path');

console.log(path.join(__dirname, 'remote', 'new.js')); // /home/yang/yang/node_learn/remote/new.js
console.log(path.resolve(__dirname, 'remote', 'new.js')); // /home/yang/yang/node_learn/remote/new.js