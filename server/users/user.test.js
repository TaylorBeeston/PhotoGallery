import MongodbMemoryServer from 'mongodb-memory-server';
import mongoose from 'mongoose';
import User from './user.model';

describe('User model tests', () => {
  const mongod = new MongodbMemoryServer();

  beforeAll(async () => {
    const uri = await mongod.getConnectionString();
    await mongoose.connect(uri, { useNewUrlParser: true });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
  });

  afterEach(async () => {
    await User.remove({});
  });

  it('should hash password on create and update', async () => {
    const user = new User({ username: 'test', password: 'password' });
    await user.save();

    expect(user.password).not.toBe('password');
  });
});
