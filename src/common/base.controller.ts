import {  Router, Response } from "express";
import { LoggerService } from "../logger/logger.service";
import { IControllerRoute } from "./route.interface";

export abstract class BaseController {
  private readonly _router: Router;
  
  constructor(private logger: LoggerService){
    this._router = Router();
  }

  get router(): Router {
    return this._router;
  }

  public send<T>(res: Response, code: number, message: T){
    res.type('application/json');
    return res.sendStatus(code).json(message);
  }

  public ok<T>(res: Response, message: T){
    this.send(res, 200, message);
  }

  public created(res: Response){
    res.sendStatus(201);
  }
  protected bindRoutes(routes: IControllerRoute[]){
    routes.forEach(route => {
      this.logger.info(`Binding ${route.method} to ${route.path}`);
      const handler = route.func.bind(this);
      this.router[route.method](route.path, handler);
    });
  }
}