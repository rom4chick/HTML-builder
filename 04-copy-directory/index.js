const fs = require('fs');
const path = require('path');

const copyFolder = async () => {
  await fs.promises.mkdir(path.resolve(__dirname, 'files-copy'), { recursive: true });
  fs.readdir(path.resolve(__dirname, 'files'), (err, files) => {
    files.forEach(async (file) => {
      await fs.copyFile(path.resolve(__dirname, 'files', file), path.resolve(__dirname, 'files-copy', file), (err) => {
        if (err) {
          console.log(err);
        }
      });
    });
  });
};

copyFolder();
