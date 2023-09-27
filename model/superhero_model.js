const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const { ValidInfoSuperhero } = require('../config/constants');

const superheroSchema = new Schema(
  {
    nickname: {
      type: String,
      unique: true,
      required: [true, 'Set nickname for superhero'],
      min: ValidInfoSuperhero.MIN_NICKNAME_LENGTH,
      max: ValidInfoSuperhero.MAX_NICKNAME_LENGTH,
    },
    real_name: {
      type: String,
      required: [true, 'Set real_name for superhero'],
    },
    origin_description: {
      type: String,
      required: [true, 'Set origin_description for superhero'],
    },
    superpowers: {
      type: String,
      required: [true, 'Set superpowers for superhero'],
    },
    catch_phrase: {
      type: String,
      required: [true, 'Set catch_phrase for superhero'],
    },
    images: {
      type: [String],
      required: [true, 'Set images for superhero'],
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      },
    },
    toObject: { virtuals: true },
  },
);

superheroSchema.plugin(mongoosePaginate);

const Superhero = model('superhero', superheroSchema);

module.exports = Superhero;
