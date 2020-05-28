import express from 'express';
import { resolve } from 'path';
import cookieParser from 'cookie-parser';
import authController from './auth/auth.controller';
import usersController from './users/users.controller';
import photosController from './photos/photos.controller';
import S3Controller from './aws/s3_signature';

// Create the express application
const app = express();
app.use(cookieParser());

// Assign controllers to routes
app.use('/auth', authController);
app.use('/api/users', usersController);
app.use('/api/photos', photosController);
app.use('/api/sign-s3', S3Controller);

// Declare the path to frontend's static assets
app.use(express.static(resolve('..', 'build')));

// Intercept requests to return the frontend's static entry point
app.get('*', (_, response) => {
  response.sendFile(resolve('..', 'build', 'index.html'));
});

export default app;
