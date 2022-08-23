import { NextFunction, Request, Response } from 'express';

export interface ITagsController {
	createTag(req: Request, res: Response, next: NextFunction): Promise<void>;
	updateTag(req: Request, res: Response, next: NextFunction): Promise<void>;
	deleteTag(req: Request, res: Response, next: NextFunction): Promise<void>;
	getAllTags(req: Request, res: Response, next: NextFunction): Promise<void>;
}
