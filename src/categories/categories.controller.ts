import { Prisma } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController } from '../common/base.controller';
import { ValidateMiddleware } from '../common/validate.middleware';
import { TryCatchWrapper } from '../decorators/ErrorCatcher';
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
	@TryCatchWrapper
	async createCategory({ body }: Request, res: Response, next: NextFunction): Promise<void> {
		const result = await this.categoriesService.createCategory(body);
		this.ok(res, result);
	}
	@TryCatchWrapper
	async updateCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
		const result = await this.categoriesService.updateCategory(req.body);
		this.ok(res, result);
	}
	@TryCatchWrapper
	async deleteCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
		const result = await this.categoriesService.deleteCategory(req.body.id);
		this.ok(res, result);
	}
	@TryCatchWrapper
	async getAllCategories(req: Request, res: Response, next: NextFunction): Promise<void> {
		const result = await this.categoriesService.getAllCategories();
		this.ok(res, result);
	}
}
