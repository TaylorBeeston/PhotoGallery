import { randomBytes } from 'crypto';
import chalk from 'chalk';
import merge from 'deepmerge';
import defaults from './defaults';
import development from './environments/development';
import production from './environments/production';

const ENV = process.env.NODE_ENV || 'development';

const config = merge.all([
  defaults,
  ENV === 'production' ? production : development,
  { ENV },
]);

if (config.JWT.SECRET === undefined) {
  console.log(
    chalk.yellow(
      `WARNING: You have not set the JWT_SECRET Environment Variable!
      The application will still run, but the secret used to validate JWT Access Tokens will
      be set to a random value every time the server restarts. This could be extremely annoying
      for your users.
    `,
    ),
  );
  console.log(
    chalk.green(
      '\nTo fix this, please set the JWT_SECRET Environment Variable\n\n',
    ),
  );

  config.JWT.SECRET = randomBytes(48).toString('base64');
}

if (config.JWT.REFRESH_SECRET === undefined) {
  console.log(
    chalk.yellow(
      `WARNING: You have not set the JWT_REFRESH_SECRET Environment Variable!
      The application will still run, but the secret used to validate JWT Refresh Tokens will
      be set to a random value every time the server restarts. This could be extremely annoying
      for your users.
    `,
    ),
  );
  console.log(
    chalk.green(
      '\nTo fix this, please set the JWT_REFRESH_SECRET Environment Variable\n\n',
    ),
  );

  config.JWT.REFRESH_SECRET = randomBytes(48).toString('base64');
}

export default config;
