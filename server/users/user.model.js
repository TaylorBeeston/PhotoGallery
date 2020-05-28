import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const saltRounds = 10;

const userSchemaDef = {
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
};

const userSchema = new Schema(userSchemaDef);

// Hash password if it has changed
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    try {
      this.password = await bcrypt.hash(this.password, saltRounds);
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

export default model('User', userSchema);
