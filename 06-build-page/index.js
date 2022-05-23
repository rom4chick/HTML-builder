const fs = require('fs');
const path = require('path');

const makeFolder = async () => {
  await fs.promises.mkdir(path.resolve(__dirname, 'project-dist'), { recursive: true });
  await fs.promises.mkdir(path.resolve(__dirname, 'project-dist', 'assets'), { recursive: true });
};

const copyFolder = async (folderName) => {
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

const insertTemplate = async () => {
  let readData = '';
  let data = '';

  let readStream = fs.createReadStream(path.resolve(__dirname, 'template.html'), 'utf-8');
  readStream.on('data', (readChunk) => {
    readData += readChunk;
  }).on('end', () => {
    let result = readData;
    fs.readdir(path.resolve(__dirname, 'components'), (err, files) => {
      files.forEach(async (file) => {
        if (file.slice(-5) === '.html') {
          let readStream = fs.createReadStream(path.resolve(__dirname, 'components', file), 'utf-8');
          readStream.on('data', (chunk) => {
            data += chunk;
          }).on('end', () => {
            result = result.replace(file.slice(0, -5), data);
            fs.writeFile(path.resolve(__dirname, 'project-dist', 'index.html'), result, (err) => {
              if (err) {
                console.log(err);
              }
            });
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

makeFolder();

copyFolder('img');

copyFolder('fonts');

copyFolder('svg');

insertTemplate();

bundleCss();
