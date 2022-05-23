const fs = require('fs');
const path = require('path');

const getInfo = async ()  => {
  try {
    const files = await fs.promises.readdir(path.resolve(__dirname, 'secret-folder'), {withFileTypes: true});
    for (const file of files) {
      if (!file.isDirectory()) {
        fs.stat(path.resolve(__dirname, 'secret-folder', file.name), (error, stats) => {
          console.log(`${file.name} ${stats.size} bytes`);
        });
      }
    }
  } catch (err) {
    console.error(err);
  }
};

getInfo();
