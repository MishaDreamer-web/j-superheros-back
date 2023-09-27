const fs = require('fs/promises');
const path = require('path');

const removeOneImageSuperhero = async imageUrl => {
  const pathToDeleteFile = path.join(
    __dirname,
    '../',
    'superheros-images',
    imageUrl,
  );

  try {
    if ((await fs.stat(pathToDeleteFile)).isFile()) {
      await fs.unlink(pathToDeleteFile, err => {
        console.error(err);
      });

      return console.log(`Image ${imageUrl} deleted`);
    }
  } catch (error) {
    console.log('No such file exist');
  }
};

module.exports = { removeOneImageSuperhero };
