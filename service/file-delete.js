const fs = require('fs/promises');
const path = require('path');

const removeSuperheroDir = async idSuperhero => {
  const pathToDeleteDir = path.join(
    __dirname,
    '../',
    'superheros-images',
    idSuperhero,
  );

  try {
    if ((await fs.stat(pathToDeleteDir)).isDirectory()) {
      await fs.rm(pathToDeleteDir, { recursive: true }, err => {
        console.error(err);
      });

      return console.log(`Directory ${idSuperhero} deleted`);
    }
  } catch (error) {
    console.log('No such directory exist');
  }
};

module.exports = { removeSuperheroDir };
