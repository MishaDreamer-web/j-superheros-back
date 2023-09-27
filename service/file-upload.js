const fs = require('fs/promises');

const path = require('path');

class UploadFileImage {
  constructor(destination) {
    this.destination = destination;
  }

  async save(file, idSuperhero) {
    await fs.rename(file.path, path.join(this.destination, file.filename));
    return path.normalize(path.join(idSuperhero, file.filename));
  }
}

module.exports = UploadFileImage;
