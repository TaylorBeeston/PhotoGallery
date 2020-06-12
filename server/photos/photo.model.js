import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const photoSchema = Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

photoSchema.plugin(uniqueValidator);

export default model('Photo', photoSchema);
