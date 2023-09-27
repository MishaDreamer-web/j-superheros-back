const Superheros = require('../repository/superheros_methods');
const { HttpCode } = require('../config/constants');
const { CustomError } = require('../helpers/custom_error');
const fs = require('fs/promises');
const path = require('path');
const { mkdirp } = require('mkdirp');
const UploadService = require('../service/file-upload');
require('dotenv').config();
const { removeSuperheroDir } = require('../service/file-delete');
const { removeOneImageSuperhero } = require('../service/one_image-delete');

const getSuperheros = async (req, res) => {
  const data = await Superheros.listSuperheros(req.query);
  res.json({ status: 'success', code: HttpCode.OK, data: { ...data } });
};

const getSuperhero = async (req, res, next) => {
  const superhero = await Superheros.getSuperheroById(req.params.id);
  if (superhero) {
    return res
      .status(HttpCode.OK)
      .json({ status: 'success', code: HttpCode.OK, data: { superhero } });
  }

  throw new CustomError(HttpCode.NOT_FOUND, 'Not found');
};

const createSuperhero = async (req, res, next) => {
  if (!req.file) {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      message: 'Missing request image file. Image are required!',
    });
  }

  const superhero = await Superheros.addSuperhero(req.body);
  const id = superhero.id;
  const file = req.file;

  const SUPERHEROS_IMAGES = process.env.SUPERHEROS_IMAGES;
  const destination = path.join(SUPERHEROS_IMAGES, id);

  await mkdirp(destination);

  const uploadService = new UploadService(destination);
  const imageUrl = await uploadService.save(file, id);

  await Superheros.updateImage(id, imageUrl);

  const newSuperhero = await Superheros.getSuperheroById(id);

  res.status(HttpCode.CREATED).json({
    status: 'success',
    code: HttpCode.CREATED,
    data: { newSuperhero },
  });
};

const removeSuperhero = async (req, res, next) => {
  const superhero = await Superheros.removeSuperhero(req.params.id);
  if (superhero) {
    await removeSuperheroDir(req.params.id);
    return res
      .status(HttpCode.OK)
      .json({ status: 'success', code: HttpCode.OK, data: { superhero } });
  }

  throw new CustomError(HttpCode.NOT_FOUND, 'Not found');
};

const updateSuperhero = async (req, res, next) => {
  const superhero = await Superheros.updateSuperhero(req.params.id, req.body);

  if (req.file) {
    const id = req.params.id;
    const file = req.file;

    const SUPERHEROS_IMAGES = process.env.SUPERHEROS_IMAGES;
    const destination = path.join(SUPERHEROS_IMAGES, id);

    await mkdirp(destination);

    const uploadService = new UploadService(destination);
    const imageUrl = await uploadService.save(file, id);

    await Superheros.updateImage(id, imageUrl);

    const newSuperhero = await Superheros.getSuperheroById(req.params.id);
    if (newSuperhero) {
      return res
        .status(HttpCode.OK)
        .json({ status: 'success', code: HttpCode.OK, data: { newSuperhero } });
    }
  }

  if (superhero) {
    return res
      .status(HttpCode.OK)
      .json({ status: 'success', code: HttpCode.OK, data: { superhero } });
  }

  throw new CustomError(HttpCode.NOT_FOUND, 'Not found');
};

const updateSuperheroImage = async (req, res, next) => {
  const superhero = await Superheros.updateSuperhero(req.params.id, req.body);

  if (superhero) {
    return res
      .status(HttpCode.OK)
      .json({ status: 'success', code: HttpCode.OK, data: { superhero } });
  }

  throw new CustomError(HttpCode.NOT_FOUND, 'Not found');
};

const uploadImages = async (req, res, next) => {
  const id = req.params.id;
  const file = req.file;

  const SUPERHEROS_IMAGES = process.env.SUPERHEROS_IMAGES;
  const destination = path.join(SUPERHEROS_IMAGES, id);

  await mkdirp(destination);

  const uploadService = new UploadService(destination);
  const imageUrl = await uploadService.save(file, id);

  await Superheros.updateImage(id, imageUrl);

  return res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    data: {
      images: [imageUrl],
    },
  });
};

const removeImageSuperhero = async (req, res) => {
  const { image } = req.body;
  const id = req.params.id;
  // console.log(image);
  // console.log(req.params.id);

  const superhero = await Superheros.getSuperheroById(id);

  if (!superhero.images.includes(image)) {
    return res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: 'Image url not found',
    });
  }

  if (superhero) {
    const newImagesArray = superhero.images.filter(el => el !== image);

    const updateImages = await Superheros.removeImage(id, newImagesArray);

    if (updateImages) {
      removeOneImageSuperhero(image);
    }
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      message: 'Deleted success',
    });
  }
};

module.exports = {
  getSuperheros,
  getSuperhero,
  createSuperhero,
  removeSuperhero,
  updateSuperhero,
  updateSuperheroImage,
  uploadImages,
  removeImageSuperhero,
};
