import { Router } from 'express';

export interface Server {
  use: Function;
  listen: Function;
}

export interface Application {
  applyMiddlewares(): void;
  registerRouters(): void;
  startServer(port: Number): void;
}

export interface Controller {
  getRouter(): Router;
  addRouter(): void;
}
