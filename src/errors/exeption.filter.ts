import { NextFunction, Request, Response } from "express";
import { LoggerService } from "../logger/logger.service";
import { IExceptionFilter } from "./exeption.filter.interface";
import { HttpError } from "./http-error.class";

export class ExeptionFilter implements IExceptionFilter{
  logger: LoggerService
  constructor(logger: LoggerService){
    this.logger = logger
  }


  catch(err: HttpError | Error, req: Request, res: Response, next: NextFunction){
    if(err instanceof HttpError){
      this.logger.error(`[${err.context} | ${err.statusCode}]: ${err.message}`);
      res.status(err.statusCode).send({error: err.message});
    }else{
      this.logger.error(`${err.message}`);
      res.status(500).send({error: err.message});
    }
  }
}