import express from 'express';
import { resolve } from 'path';
import cookieParser from 'cookie-parser';
import withSSL from './protocol/heroku_ssl';
import authController from './auth/auth.controller';
import usersController from './users/users.controller';
import photosController from './photos/photos.controller';
import uploadsController from './uploads/uploads.controller';

// Create the express application
const app = express();
app.use(cookieParser());

// Assign controllers to routes
app.use('/auth', authController);
app.use('/api/users', usersController);
app.use('/api/photos', photosController);
app.use('/api/uploads', uploadsController);

// Declare the path to frontend's static assets
app.use(express.static(resolve('..', 'build')));

// Intercept requests to return the frontend's static entry point
app.get('*', withSSL, (_, response) => {
  return response.sendFile(resolve('..', 'build', 'index.html'));
});

export default app;
