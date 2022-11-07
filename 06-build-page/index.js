const fs = require('fs');
const path = require('path');

const createFolder = async () => {
  await fs.promises.mkdir(path.resolve(__dirname, 'project-dist'), { recursive: true });
  await fs.promises.mkdir(path.resolve(__dirname, 'project-dist', 'assets'), { recursive: true });
};

const analogFolder = async (folderName) => {
  await fs.promises.mkdir(path.resolve(__dirname, 'project-dist', 'assets', folderName), {recursive: true});
  fs.readdir(path.resolve(__dirname, 'assets', folderName), (err, files) => {
    files.forEach(async (file) => {
      await fs.copyFile(path.resolve(__dirname, 'assets', folderName, file)
        , path.resolve(__dirname, 'project-dist', 'assets', folderName, file), (err) => {
          if (err) {
            console.log(err);
          }
        });
    });
  });
};



const takeTemplate = async () => {
  let readData = '';
  let data = '';
  // let resultBebra = '';

  let readStream = fs.createReadStream(path.resolve(__dirname, 'template.html'), 'utf-8');
  readStream.on('data', (readChunk) => {
    readData += readChunk;
  }).on('end', () => {
    let result = readData;
    fs.readdir(path.resolve(__dirname, 'components'), (err, files) => {
      files.forEach(async (file) => {
        if (file.slice(-5) === '.html') {
          console.log('File: ' + file);
          let readStream = fs.createReadStream(path.resolve(__dirname, 'components', file), 'utf-8');
          // data = '';
          readStream.on('data', (chunk) => {
            if (!data) {
              data += chunk;
            } else {
              data = '';
              data += chunk;
            }
            console.log(file);
            console.log(`{{${file.slice(0, -5)}}}`);
            result = result.replace(`{{${file.slice(0, -5)}}}`, data);
            fs.writeFile(path.resolve(__dirname, 'project-dist', 'index.html'), result, (err) => {
              if (err) {
                console.log(err);
              }
            });
            console.log('data: ' + data);
          }).on('end', () => {

            // resultBebra = result;
          });
        }

      });
    });
  });


};

const bundleCss = () => {
  let data = '';

  fs.readdir(path.resolve(__dirname, 'styles'), (err, files) => {
    files.forEach(async (file) => {
      if (file.slice(-4) === '.css') {
        let readStream = fs.createReadStream(path.resolve(__dirname, 'styles', file), 'utf-8');
        readStream.on('data', (chunk) => {
          data += chunk;
        }).on('end', () => {
          fs.writeFile(path.resolve(__dirname, 'project-dist', 'style.css'), data, (err) => {
            if (err) {
              console.log(err);
            }
          });
        });
      }
    });
  });
};

createFolder();

analogFolder('img');

analogFolder('fonts');

analogFolder('svg');

takeTemplate();

bundleCss();

