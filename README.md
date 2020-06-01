<h3 align="center">The Beeston Kids</h3>

<div align="center">

  [![GitHub issues](https://img.shields.io/github/issues/TaylorBeeston/TheBeestonKids)](https://github.com/TaylorBeeston/TheBeestonKids/issues)
  [![GitHub license](https://img.shields.io/github/license/TaylorBeeston/TheBeestonKids)](https://github.com/TaylorBeeston/TheBeestonKids/blob/master/LICENSE.md)

</div>

---

<p align="center"> A simple image hosting webstie.
    <br> 
</p>

## 📝 Table of Contents
- [About](#about)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Built Using](#built_using)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)
- [TODO](./TODO.md)
- [Contributing](./CONTRIBUTING.md)

## 🧐 About <a name="about"></a>
I have a lot of family members asking my wife and I to send them photos of our children. Many of them
do not use websites like Facebook or Instagram, and would prefer not to make an account. This has led
to a bit of frustration when sending out photos. So, I decided to build my own image hosting website
that does not require anything to view the photos, and allows me to easily upload all the pictures I
need.

## 🏁 Getting Started <a name = "getting_started"></a>
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites
- Node
- Yarn
- MongoDB
- Redis

### Installing

#### Clone
First, clone this repository using the following command
```bash
$ git clone git@github.com:TaylorBeeston/TheBeestonKids.git
```

#### Mongo
Next, make sure you have MongoDB up and running by following the instructions 
[here](https://docs.mongodb.com/manual/administration/install-community/), or by using a cloud
service such as [Atlas](https://www.mongodb.com/cloud/atlas). If needed, the MongoDB URI can be
set with the `MONGODB_URI` environment variable, or by updating the default value in 
`server/config/defaults.js`.

#### Redis
Once you have Mongo up and Running, you will need to set up [Redis](https://redis.io/download).
Similarly to Mongo, you can set the `REDIS_URI` environment variable, or update the default
value in `server/config/defaults.js`.

#### Environment Variables
With Redis and Mongo Set up, the last thing you will need to do is set your environment variables.
In development, the only environment variables you should need to set are `JWT_SECRET`, and 
`JWT_REFRESH_SECRET`. These can be set to anything you like. They represent a secret string used
to sign and verify JSON web tokens for authentication. You may set them by creating a file named
`.env` in the root folder and adding the following to it
```
JWT_SECRET=YANKEEWITHNOBRIM
JWT_REFRESH_SECRET=BRIMWITHNOYANKEE
```

In production, or if you set the development uploader to use S3 by editing the 
`server/config/environments/development.js` file, you will additionally need to set the
`AWS_S3_BUCKET_NAME`, `AWS_REGION`, `AWS_ACCESS_KEY_ID`, and `AWS_SECRET_ACCESS_KEY` variables.
This can be done using the same .env file, but if you are hosting your site using a service such as
Heroku, they usually provide an alternative method to set environment variables.

#### Admin Accounts
To be able to sign in, you need to be able to make an account! This can be done by running 
`yarn new-admin`, which will start a CLI tool that asks for a username and password, and then
generates an admin account for you. You can make as many accounts as you like, however each account
must have a unique username.

#### 🚀 Start uploading!
Make sure Mongo and Redis are running, then launch the server with `yarn start-server` and the
client with `yarn start-client`. Your browser should open to `localhost:3000`, and allow you to
sign in and start uploading photos!

## 🚀 Deployment <a name = "deployment"></a>
I have not yet deployed this site myself, so you'll have to bare with me as I work on this part of
the README.

### Build
First, run the following command
```bash
$ yarn build
```

This will create two folders, `build`, and `build-server`.

### Deploy

#### Foreword
I would suggest creating a separate branch that contains just the `build` and `build-server` folders
and the `package.json` file, then deploying that branch. 

#### Environment Variables
As mentioned above in [Getting Started](#getting_started), you will need to set the following
environment variables
```
JWT_SECRET=SUPERSECRETSECRET
JWT_REFRESH_SECRET=ALSOASECRET
AWS_S3_BUCKET_NAME=mybucketname
AWS_REGION=us-west-2
AWS_ACCESS_KEY_ID=biglongstring
AWS_SECRET_ACCESS_KEY=biggerlongerstring
```

#### Starting the Server
The server may then be started running
```bash
$ yarn start
```

## ⛏️ Built Using <a name="built_using"></a>
- [MongoDB](https://www.mongodb.com/) - Database
- [Express](https://expressjs.com/) - Server Framework
- [ReactJS](https://reactjs.org/) - Web Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment
- [Tailwind](https://tailwindcss.org/) - CSS Framework

## ✍️ Authors <a name="authors"></a>
- [@TaylorBeeston](https://github.com/TaylorBeeston) - Creater/Maintainer

See also the list of [contributors](https://github.com/TaylorBeeston/TheBeestonKids/contributors) who participated in this project.

## 🎉 Acknowledgements <a name="acknowledgement"></a>
- Dev.to
- Medium.com
- Stackoverflow.com
- Coffee
