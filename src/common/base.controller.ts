import { Router, Response } from 'express';
import { injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { IControllerRoute } from './route.interface';
import 'reflect-metadata';

@injectable()
export abstract class BaseController {
	private readonly _router: Router;

	constructor(private logger: ILogger) {
		this._router = Router();
	}

	get router(): Router {
		return this._router;
	}

	public send<T>(res: Response, code: number, message: T): Response<T, Record<string, T>> {
		res.type('application/json');
		return res.sendStatus(code).json(message);
	}

	public ok<T>(res: Response, message: T): Response<T, Record<string, T>> {
		return this.send<T>(res, 200, message);
	}

	public created(res: Response) {
		return res.sendStatus(201);
	}
	protected bindRoutes(routes: IControllerRoute[]): void {
		routes.forEach((route) => {
			this.logger.info(`Binding ${route.method} to ${route.path}`);
			const middleware = route.middlewares?.map((m) => m.execute.bind(m));
			const handler = route.func.bind(this);
			const pipline = middleware ? [...middleware, handler] : handler;
			this.router[route.method](route.path, pipline);
		});
	}
}
