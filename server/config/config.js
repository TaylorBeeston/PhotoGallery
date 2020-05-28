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

export default config;
