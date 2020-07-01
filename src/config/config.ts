import merge from 'deepmerge';
import { Config } from 'types/config';
import defaults from 'config/defaults';
import development from 'config/environments/development';
import production from 'config/environments/production';

const ENV = process.env.NODE_ENV || 'development';

const config: Config = merge.all<Config>([
  defaults,
  ENV === 'production' ? production : development,
  { ENV },
]);

export default config;
