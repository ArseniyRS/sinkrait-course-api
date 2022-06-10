import { NextFunction, Request, Response } from "express";
import { LoggerService } from "../logger/logger.service";
import { IExceptionFilter } from "./exeption.filter.interface";

export class ExeptionFilter implements IExceptionFilter{
  logger: LoggerService
  constructor(logger: LoggerService){
    this.logger = logger
  }


  catch(err: Error, req: Request, res: Response, next: NextFunction){
    this.logger.error(`${err.message}`);
    res.status(500).send({error: err.message});
  }
}