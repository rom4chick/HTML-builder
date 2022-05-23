const fs = require('fs');
const path = require('path');

let data = '';

fs.readdir(path.resolve(__dirname, 'styles'), (err, files) => {
  files.forEach(async (file) => {
    if (file.slice(-4) === '.css') {
      let readStream = fs.createReadStream(path.resolve(__dirname, 'styles', file), 'utf-8');
      readStream.on('data', (chunk) => {
        data += chunk;
      }).on('end', () => {
        fs.writeFile(path.resolve(__dirname, 'project-dist', 'bundle.css'), data, (err) => {
          if (err) {
            console.log(err);
          }
        });
      });
    }
   
    
  });
});


