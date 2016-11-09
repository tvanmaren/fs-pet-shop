'use strict';

var fs=require('fs');
var path=require('path');

var node=path.basename(process.argv[0]);
var file = path.basename(process.argv[1]);
var cmd=process.argv[2];

if (cmd==='read') {
  fs.readFile('./pets.json', 'utf8', (err, data) => {if (err) {throw err;}
  let readOut=JSON.parse(data);
  console.log(readOut);
});
} else {
  if (!cmd) {
    console.error(`Usage ${node} ${file} [read | create | update | destroy]`);
    process.exit(1);
  }
}
