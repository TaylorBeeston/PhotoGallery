# The Beeston Kids
A simple image uploading website

---

## Table of Contents

* [Development](#development)
  + [Frontend instructions](#frontend-instructions)
  + [Backend instructions](#backend-instructions)
* [Deployment](#deployment)
  + [Build/Serve](#buildserve)
  + [Environment Variables](#environment-variables)
  + [Setup](#setup)
* [Please note](#please-note)

---

## Development 
### Frontend instructions

This frontend was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Please refer to the source for more information.

Start development client:
```
yarn start-client
```

Run client tests:
```
yarn test-client
```

Build client for production:
```
yarn build-client
```

### Backend instructions

This backend uses MongoDB, make sure you have it installed in your system.

Install MongoDB and start your server: [MongoDB instructions](https://docs.mongodb.com/manual/administration/install-community/)

Start development server:
```
yarn start-server
```

Run server tests:
```
yarn test-server
```

Build server for production:
```
yarn build-server
```

## Deployment
### Build/Serve
Build both frontend and backend using 
```
yarn build
```

Then
```
yarn start
```

If you are using Heroku, I would suggest building and then pushing the built files directly
to Heroku to have the server spin up faster.

### Environment Variables

Please include the following environment variables in your production environment:
```
AWS_S3_BUCKET_NAME      The name of your AWS S3 Bucket
AWS_REGION              Your AWS S3 Bucket's Region
AWS_ACCESS_KEY_ID       The AWS Access Key for your AWS IAM account
AWS_SECRET_ACCESS_KEY   The AWS Secret Access Key for your AWS IAM account
JWT_SECRET              A secret string to use when signing Access Tokens
JWT_REFRESH_SECRET      A secret string to use when signing Refresh Tokens
```

### Setup

Once you have successfully deployed to your production environment, create a new admin account with
```
yarn new-admin
```

You may now log in and upload photos using the account(s) you created with the new-admin script!

## Please note
Currently, there is no system in place to differentiate between environments. This means that
if you use a given S3 bucket in development, that same bucket will be used in production! I am
planning on setting up a system to handle different environments to facilitate the separation
of production, development, and testing, but currently it simply does not exist.
