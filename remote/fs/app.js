const {readFile, writeFile} = require('fs');
const path = require('path');
const util = require('util');
const readProm = util.promisify(readFile);
const writeProm = util.promisify(writeFile);


const saved = async()=>{
    const read = await readProm(path.join(__dirname, 'me.txt'), 'utf-8');
    console.log(read);
}

saved();