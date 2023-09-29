const express = require('express');
const router = express.Router();
const {
  getSuperheros,
  getSuperhero,
  createSuperhero,
  removeSuperhero,
  updateSuperhero,
  removeImageSuperhero,
  uploadImages,
} = require('../../controllers/superheros_controllers');
const { validateSuperhero, validateId } = require('./validation');
const wrapError = require('../../helpers/error_handler');
const upload = require('../../helpers/uploads');

// Get all superheros
router.get('/', wrapError(getSuperheros));

// Get superheros by id
router.get('/:id', validateId, wrapError(getSuperhero));

// Create superhero
router.post(
  '/',
  upload.single('images'),
  validateSuperhero,
  wrapError(createSuperhero),
);

// Delete superhero
router.delete('/:id', validateId, wrapError(removeSuperhero));

// Remove superhero image
router.delete('/:id/images/', validateId, wrapError(removeImageSuperhero));

// Update superhero
router.put(
  '/:id',
  upload.single('images'),
  validateId,
  wrapError(updateSuperhero),
);

// Adding superhero image
router.patch(
  '/:id/images/',
  validateId,
  upload.single('images'),
  wrapError(uploadImages),
);

module.exports = router;
