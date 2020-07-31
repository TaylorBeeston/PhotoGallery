/* eslint-disable no-unused-expressions */
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import User from './user.model';

jest.setTimeout(60000);

describe('User model tests', () => {
  const mongod = new MongoMemoryServer();

  beforeAll(async () => {
    const uri = await mongod.getConnectionString();
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  it('should enforce minimum character lengths', async () => {
    const shortName = new User({ username: 'short', password: 'password' });
    expect(shortName).not.toBeValid;

    const shortPassword = new User({ username: 'longName', password: 'short' });
    expect(shortPassword).not.toBeValid;
  });

  it('should require username and password', async () => {
    const noName = new User({ password: 'password' });
    expect(noName).not.toBeValid;

    const noPassword = new User({ username: 'longName' });
    expect(noPassword).not.toBeValid;
  });

  it('should enforce unique usernames but not passwords', async () => {
    User.create({ username: 'validName', password: 'password' });

    const differentPassword = new User({
      username: 'validName',
      password: 'different',
    });
    expect(differentPassword).not.tobeValid;

    const differentUsername = new User({
      username: 'differentName',
      password: 'password',
    });
    expect(differentUsername).toBeValid;
  });

  it('should hash password on create and update', async () => {
    const user = await User.create({
      username: 'testName',
      password: 'password',
    });

    expect(user.password).not.toBe('password');

    await User.findOneAndUpdate(
      { username: 'testname' },
      { password: 'different' },
    );
    expect(user.password).not.toBe('different');
  });

  it('should be able to verify correct password', async () => {
    const user = await User.create({
      username: 'testName',
      password: 'password',
    });

    expect(user.isCorrectPassword('different')).toBeFalsy;
    expect(user.isCorrectPassword('password')).toBeTruthy;
  });
});
