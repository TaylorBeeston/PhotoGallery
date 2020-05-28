import { connect } from 'mongoose';
import config from './config/config';
import app from './app';

const { MONGODB_URI, PORT } = config.SERVER;

(async () => {
  await connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
  app.listen(PORT);
  console.log(`App listening on port ${PORT}...`);
})();
