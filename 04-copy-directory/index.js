const fs = require('fs');
const path = require('path');

const copyFolder = async () => {
  try {
    await fs.copyFile(path.resolve(__dirname, 'files'), path.resolve(__dirname, 'files-copy'));
    console.log('source.txt was copied to destination.txt');
  } catch {
    console.log('The file could not be copied');
  }
};

copyFolder();
