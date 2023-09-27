const Superhero = require('../model/superhero_model');

const listSuperheros = async query => {
  const { limit = 5, page = 1 } = query;

  const results = await Superhero.paginate(
    {},
    {
      limit,
      page,
      sort: { nickname: 1 },
    },
  );
  const { docs: superheros } = results;
  delete results.docs;
  return { ...results, superheros };
};

const getSuperheroById = async id => {
  const result = await Superhero.findById(id);
  return result;
};

const removeSuperhero = async id => {
  const result = await Superhero.findByIdAndRemove({ _id: id });
  return result;
};

const addSuperhero = async body => {
  const result = await Superhero.create(body);
  return result;
};

const updateSuperhero = async (id, body) => {
  const result = await Superhero.findByIdAndUpdate(
    { _id: id },
    { ...body },
    { new: true },
  );
  return result;
};

const updateImage = async (id, image) => {
  return await Superhero.updateOne({ _id: id }, { $push: { images: image } });
};

const removeImage = async (id, newArray) => {
  return await Superhero.updateOne({ _id: id }, { images: newArray });
};

module.exports = {
  listSuperheros,
  getSuperheroById,
  removeSuperhero,
  addSuperhero,
  updateSuperhero,
  updateImage,
  removeImage,
};
