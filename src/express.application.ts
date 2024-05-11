import express from 'express';
import { Controller, Application, Server } from './interfaces';

export class ExpressApplication implements Application {
  private app: Server;
  private controllers: Controller[];

  constructor(app: Server, controllers: Controller[]) {
    this.app = app;
    this.controllers = controllers;
    this.applyMiddlewares();
    this.registerRouters();
  }

  applyMiddlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  registerRouters() {
    this.controllers.forEach((controller) => {
      this.app.use(controller.getRouter());
    });
  }

  startServer(port: Number) {
    this.app.listen(port, () => {
      console.log(`## Server listening on port: ${port}`);
    });
  }
}
