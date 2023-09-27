const express = require('express');
const router = express.Router();
const {
  getSuperheros,
  getSuperhero,
  createSuperhero,
  removeSuperhero,
  updateSuperhero,
  updateSuperheroImage,
  removeImageSuperhero,
  uploadImages,
} = require('../../controllers/superheros_controllers');
const {
  validateSuperhero,
  validateImagesSuperhero,
  validateId,
} = require('./validation');
const wrapError = require('../../helpers/error_handler');
const upload = require('../../helpers/uploads');

router.get('/', wrapError(getSuperheros));

router.get('/:id', validateId, wrapError(getSuperhero));

router.post(
  '/',
  upload.single('images'),
  validateSuperhero,
  wrapError(createSuperhero),
);

router.delete('/:id', validateId, wrapError(removeSuperhero));

router.delete('/:id/images/', validateId, wrapError(removeImageSuperhero));

router.put(
  '/:id',
  upload.single('images'),
  [(validateId, validateSuperhero)],
  wrapError(updateSuperhero),
);

router.patch(
  '/:id/images/',
  validateId,
  upload.single('images'),
  wrapError(uploadImages),
);

// router.patch(
//   '/:id/images/',
//   upload.single('images'),
//   [validateId, validateImagesSuperhero],
//   wrapError(uploadImages),
// );

module.exports = router;
