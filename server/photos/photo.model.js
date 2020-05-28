import { Schema, model } from 'mongoose';

const photoSchemaDef = {
  name: {
    type: String,
    unique: true,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
};

const photoSchema = new Schema(photoSchemaDef);

export default model('Photo', photoSchema);
