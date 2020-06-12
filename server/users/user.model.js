import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import uniqueValidator from 'mongoose-unique-validator';
import config from '../config/config';

const { PASSWORD_SALT_ROUNDS } = config.SECURITY;

const userSchema = Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    minlength: 6,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
});

// Hash password if it has changed
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    try {
      this.password = await bcrypt.hash(this.password, PASSWORD_SALT_ROUNDS);
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.plugin(uniqueValidator);

export default model('User', userSchema);
