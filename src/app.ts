import express, { Express } from 'express';
import {Server} from 'http';
import { inject, injectable } from 'inversify';
import { ExeptionFilter } from './errors/exeption.filter';
import { ILogger } from './logger/logger.interface';
import { LoggerService } from './logger/logger.service';
import { TYPES } from './types';
import { UserController } from './users/users.controller';
import 'reflect-metadata';
@injectable()
export class App{
  app: Express
  port: number;
  server: Server | undefined;

  constructor(
    @inject(TYPES.ILogger) private logger: ILogger,
    @inject(TYPES.UserController) private userController: UserController,
    @inject(TYPES.ExeptionFilter) private exeptionFilter: ExeptionFilter,
    ){
    this.app = express();
    this.port = 8000;
  }

  useRoutes(){
    this.app.use('/users', this.userController.router);
  }
  useExeptionFilters(){
    this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
  }
  public async init(){
    this.useRoutes()
    this.useExeptionFilters()
    this.server = this.app.listen(this.port);
    this.logger.info(`Server started on port ${this.port}`);
  }
}