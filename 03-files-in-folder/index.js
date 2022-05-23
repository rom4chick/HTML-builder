const fs = require('fs');
const path = require('path');

const getInfo = async ()  => {
  try {
    const files = await fs.promises.readdir(path.resolve(__dirname, 'secret-folder'), {withFileTypes: true});
    for (const file of files) {
      if (!file.isDirectory()) {
        fs.stat(path.resolve(__dirname, 'secret-folder', file.name), (error, stats) => {
          let fileName = file.name;
          let index = fileName.indexOf('.');
          fileName = fileName.slice(0, index);
          console.log(`${fileName} - ${path.extname(path.resolve(__dirname, 'secret-folder', file.name))} - ${stats.size} bytes`);
        });
      }
    }
  } catch (err) {
    console.error(err);
  }
};

getInfo();
