import { Request, Response, NextFunction } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { IMiddleware } from './route.interface';

export class AuthMiddleware implements IMiddleware {
	constructor(private secret: string) {}
	execute(req: Request, res: Response, next: NextFunction) {
		const token = req.headers.authorization;
		if (token) {
			verify(token.split(' ')[1], this.secret, (err, payload) => {
				if (err) {
					next();
				} else if (payload && typeof payload === 'object') {
					req.user = payload.email;
					next();
				}
			});
		}
		next();
	}
}
