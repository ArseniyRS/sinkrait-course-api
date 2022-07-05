import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { LoggerService } from '../logger/logger.service';
import { TYPES } from '../types';
import { IExceptionFilter } from './exeption.filter.interface';
import { HttpError } from './http-error.class';
import 'reflect-metadata';

@injectable()
export class ExeptionFilter implements IExceptionFilter {
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {}

	catch(err: HttpError | Error, req: Request, res: Response, next: NextFunction): void {
		if (err instanceof HttpError) {
			this.logger.error(`[${err.context} | ${err.statusCode}]: ${err.message}`);
			res.status(err.statusCode).send({ error: err.message });
		} else {
			this.logger.error(`${err.message}`);
			res.status(500).send({ error: err.message });
		}
	}
}
