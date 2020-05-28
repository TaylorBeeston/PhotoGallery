import { connect } from 'mongoose';
import app from './app';
import { port, mongoUrl } from './config';

(async () => {
  await connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  app.listen(port);
  console.log(`App listening on port ${port}...`);
})();
