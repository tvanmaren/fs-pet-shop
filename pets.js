'use strict';

var fs = require('fs');
var path = require('path');

var node = path.basename(process.argv[0]);
var file = path.basename(process.argv[1]);
var cmd = process.argv[2];

const baseUse=`Usage ${node} ${file} [read | create | update | destroy]`;

if (cmd === 'read') {
    fs.readFile('./pets.json', 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        let readOut = JSON.parse(data);
        let index = +process.argv[3];
        if (isNaN(index)) {
          console.log(readOut);
        }
        else if (index>=0 && index<readOut.length) {
            console.log(readOut[index]);
        } else {
            console.error(baseUse+' INDEX');
        }
    });
} else {
    if (!cmd) {
        console.error(baseUse);
        process.exit(1);
    }
}
