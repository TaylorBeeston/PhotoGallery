/* eslint-disable no-unused-expressions */
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import Photo from './photo.model';

jest.setTimeout(60000);

describe('/api/photos tests', () => {
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
    await Photo.deleteMany({});
  });

  it('should require a name and url', async () => {
    const allFields = new Photo({
      name: 'test',
      url: 'test.com',
      thumbnailUrl: 'test.com/2',
      date: Date.now,
    });
    expect(allFields).toBeValid;

    const nameAndUrlOnly = new Photo({ name: 'testPhoto', url: 'example.com' });
    expect(nameAndUrlOnly).toBeValid;

    const noUrl = new Photo({ name: 'testPhoto', thumbnailUrl: 'example.com' });
    expect(noUrl).not.toBeValid;

    const noName = new Photo({ url: 'test.com', thumbnailUrl: 'example.com' });
    expect(noName).not.toBeValid;
  });

  it('should have a unique name', async () => {
    Photo.create({ name: 'testPhoto', url: 'example.com' });

    const sameName = new Photo({ name: 'testPhoto', url: 'test.com' });
    expect(sameName).not.toBeValid;

    const differentName = new Photo({
      name: 'differentName',
      url: 'example.com',
    });
    expect(differentName).toBeValid;
  });

  it('should always have a date', async () => {
    const photo = Photo.create({ name: 'testPhoto', url: 'example.com' });
    expect(photo.date).toBeDefined;
  });
});
