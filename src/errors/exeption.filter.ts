import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { ILogger } from "../logger/logger.interface";
import { LoggerService } from "../logger/logger.service";
import { TYPES } from "../types";
import { IExceptionFilter } from "./exeption.filter.interface";
@injectable()
export class ExeptionFilter implements IExceptionFilter{
  constructor(@inject(TYPES.ILogger) private logger: ILogger){}


  catch(err: Error, req: Request, res: Response, next: NextFunction){
    this.logger.error(`${err.message}`);
    res.status(500).send({error: err.message});
  }
}