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
  let data = '';
  let readStream = fs.createReadStream(path.resolve(__dirname, 'template.html'), 'utf-8');

  readStream.on('data', (chunk) => {
    data += chunk;
  }).on('end', () => {
    let result = data;
    let headerData = '';
    let footerData = '';
    let articlesData = '';

    let headerReadStream = fs.createReadStream(path.resolve(__dirname, 'components', 'header.html'), 'utf-8');
    let footerReadStream = fs.createReadStream(path.resolve(__dirname, 'components', 'footer.html'), 'utf-8');
    let articlesReadStream = fs.createReadStream(path.resolve(__dirname, 'components', 'articles.html'), 'utf-8');
    
    headerReadStream.on('data', (headerChunk) => {
      headerData += headerChunk;
    }).on('end', () => {
      result = result.replace('{{header}}', headerData);
    });

    footerReadStream.on('data', (footerChunk) => {
      footerData += footerChunk;
    }).on('end', () => {
      result = result.replace('{{footer}}', footerData);
    });

    articlesReadStream.on('data', (articlesChunk) => {
      articlesData += articlesChunk;
    }).on('end', () => {
      result = result.replace('{{articles}}', articlesData);
      fs.writeFile(path.resolve(__dirname, 'project-dist', 'index.html'), result, (err) => {
        if (err) {
          console.log(err);
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
