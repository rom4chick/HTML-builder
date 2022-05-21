const fs = require('fs');
const path = require('path');

async function bebra() {
  try {
    const files = await fs.promises.readdir(path.resolve(__dirname, 'secret-folder'), {withFileTypes: true});
    for (const file of files) {
      if (!file.isDirectory()) {
        console.log(file.name);
        fs.stat(path.resolve(__dirname, 'secret-folder', file.name), (error, stats) => {
          console.log(stats.size);
        });
      }
    }
     
  } catch (err) {
    console.error(err);
  }
}

bebra();
