const fs = require('fs');
const path = require('path');

let data = '';

let readStream = fs.createReadStream(path.resolve(__dirname, 'text.txt'), 'utf-8');

readStream.on('data', (chunk) => {
 
  data += chunk;
}).on('end', () => {
  console.log(data);
});