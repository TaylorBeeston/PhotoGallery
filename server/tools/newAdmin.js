import { connect, disconnect } from 'mongoose';
import inquirer from 'inquirer';
import chalk from 'chalk';
import User from '../users/user.model';
import config from '../config/config';

const { MONGODB_URI } = config.SERVER;

(async () => {
  try {
    await connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log(chalk.yellow('====================='));
    console.log(chalk.yellow('| New Admin Account |'));
    console.log(chalk.yellow('====================='));

    const { username, password } = await inquirer.prompt([
      {
        name: 'username',
        message:
          'Please enter the username for this account (default is admin)',
        default: 'admin',
      },
      {
        name: 'password',
        message:
          'Please enter the password for this account (default is password)',
        default: 'password',
      },
    ]);

    const user = new User({ username, password });
    await user.save();

    console.log(chalk.green(`Admin user ${username} successfully created.`));
  } catch (error) {
    console.log(chalk.red(error));
  } finally {
    await disconnect();
  }
})();
