import express, { Application } from 'express';
import { ExpressApplication } from './express.application';
import { Controller } from './interfaces';
import { UserController } from './user/user.controller';
import { container as container } from './container';
import { Symbols } from './symbols';

function main() {
  const app = express();
  const controllers = new Array<Controller>();
  const userController = container.get<UserController>(Symbols.UserController);
  controllers.push(userController);

  const expressApp = new ExpressApplication(app, controllers);
  expressApp.startServer(8080);
}

main();
