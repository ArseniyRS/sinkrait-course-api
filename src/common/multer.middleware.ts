import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { IMiddleware } from './route.interface';
import path from 'path';

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

export class MulterMiddleware implements IMiddleware {
	execute(req: Request, res: Response, next: NextFunction): void {
		const upload = multer({
			storage: multer.diskStorage({
				destination: function (req: Request, file: Express.Multer.File, cb: DestinationCallback) {
					cb(null, 'uploads/');
				},
				filename: function (req: Request, file: Express.Multer.File, cb: FileNameCallback) {
					cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
				},
			}),
		}).single('img');
		upload(req, res, function (err) {
			if (err instanceof multer.MulterError) {
				res.status(400).send(err.message);
			} else if (err) {
				res.status(400).send('Ошибка загрузки файла');
			}
			next();
		});
	}
}
