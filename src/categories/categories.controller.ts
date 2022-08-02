import { Prisma } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController } from '../common/base.controller';
import { ValidateMiddleware } from '../common/validate.middleware';
import { HttpError } from '../errors/http-error.class';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { CategoryDto } from './dto/category.dto';
import { ICategoriesController } from './interfaces/categories.controller.interface';
import { ICategoriesService } from './interfaces/categories.service.interface';

@injectable()
export class CategoriesController extends BaseController implements ICategoriesController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.CategoriesService) private categoriesService: ICategoriesService,
	) {
		super(loggerService);
		this.bindRoutes([
			{ method: 'get', path: '/categories', func: this.getAllCategories, middlewares: [] },
			{
				method: 'post',
				path: '/categories',
				func: this.createCategory,
				middlewares: [new ValidateMiddleware(CategoryDto)],
			},
			{
				method: 'put',
				path: '/categories',
				func: this.updateCategory,
				middlewares: [new ValidateMiddleware(CategoryDto)],
			},
			{
				method: 'delete',
				path: '/categories',
				func: this.deleteCategory,
				middlewares: [],
			},
		]);
	}

	async createCategory({ body }: Request, res: Response, next: NextFunction): Promise<void> {
		const result = await this.categoriesService.createCategory(body);
		if (!result) {
			return next(new HttpError(500, 'Error'));
		}
		this.ok(res, result);
	}

	async updateCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
		const result = await this.categoriesService.updateCategory(req.body);
		if (!result) {
			return next(new HttpError(500, 'Error'));
		}
		this.ok(res, result);
	}

	async deleteCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const result = await this.categoriesService.deleteCategory(req.body.id);
			this.ok(res, result);
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				return next(new HttpError(500, e.message));
			}
			return next(new HttpError(500, 'Error'));
		}
	}

	async getAllCategories(req: Request, res: Response, next: NextFunction): Promise<void> {
		const result = await this.categoriesService.getAllCategories();
		if (!result) {
			return next(new HttpError(500, 'Error'));
		}
		this.ok(res, result);
	}
}
