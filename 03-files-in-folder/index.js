const fs = require('fs');
const path = require('path');

const getInfo = async ()  => {
  try {
    let fileNames = [];
    let fileSizes = [];
    const files = await fs.promises.readdir(path.resolve(__dirname, 'secret-folder'), {withFileTypes: true});
    for (const file of files) {
      if (!file.isDirectory()) {
        fileNames.push(file.name);
        fs.stat(path.resolve(__dirname, 'secret-folder', file.name), (error, stats) => {
          console.log(`${file.name} ${stats.size}`);
          fileSizes.push(stats.size);
        });
      }
    }
    console.log(fileNames);
    console.log(fileSizes);
    return (fileNames, fileSizes);
     
  } catch (err) {
    console.error(err);
  }
};

// const show = (tuple) => {
//   for (let i = 0; i < tuple[0].length; i += 1) {
//     console.log(`${tuple[0][i]}`);
//   }
// };

getInfo();


// show(getInfo());
