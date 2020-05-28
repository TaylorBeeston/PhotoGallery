import MongodbMemoryServer from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app';
import Photo from './photo.model';

describe('/api/photos tests', () => {
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
    await Photo.remove({});
  });

  it('should post and get a photo', async () => {
    const postResponse = await request(app)
      .post('/api/photos')
      .send({ name: 'Test Photo', url: 'example.com' });
    expect(postResponse.status).toBe(200);

    const getResponse = await request(app).get('/api/photos');
    expect(getResponse.status).toBe(200);
    expect(getResponse.body).toEqual([
      expect.objectContaining({ name: 'Test Photo', url: 'example.com' }),
    ]);
  });
});
