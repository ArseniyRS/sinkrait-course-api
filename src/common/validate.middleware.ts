import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { stringToOtherTypeConverter } from '../utils/type.convert';
import { IMiddleware } from './route.interface';

export class ValidateMiddleware implements IMiddleware {
	constructor(private classToValidate: ClassConstructor<object>) {}
	execute({ body }: Request, res: Response, next: NextFunction): void {
		for (const key in body) {
			body[key] = stringToOtherTypeConverter(body[key]);
		}
		const instance = plainToClass(this.classToValidate, body);
		validate(instance).then((errors) => {
			if (errors.length > 0) {
				const errorMessages = errors.reduce((prev, cur) => {
					return { ...prev, [cur.property]: { ...cur.constraints } };
				}, {});
				res.status(400).send(errorMessages);
			} else {
				next();
			}
		});
	}
}
