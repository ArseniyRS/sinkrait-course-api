import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { parse } from 'querystring';
import { BaseController } from '../common/base.controller';
import { ValidateMiddleware } from '../common/validate.middleware';
import { TryCatchWrapper } from '../decorators/ErrorCatcher';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { CourseDto } from './dto/Course.dto';
import { CourseByCategoryDto } from './dto/CourseByCategory.dto';
import { CourseByTagsDto } from './dto/CourseByTags.dto';
import { ICoursesController } from './interfaces/courses.controller.interface';
import { ICoursesService } from './interfaces/courses.service.interface';

injectable();
export class CoursesController extends BaseController implements ICoursesController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.CoursesService) private coursesService: ICoursesService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				method: 'get',
				path: '/',
				func: this.getAllCourses,
				middlewares: [],
			},
			{
				method: 'post',
				path: '/',
				func: this.createCourse,
				middlewares: [new ValidateMiddleware(CourseDto)],
			},
			{
				method: 'put',
				path: '/',
				func: this.updateCourse,
				middlewares: [new ValidateMiddleware(CourseDto)],
			},
			{
				method: 'delete',
				path: '/',
				func: this.deleteCourse,
				middlewares: [],
			},
			{
				method: 'get',
				path: '/category/:categoryId',
				func: this.getCoursesByCategory,
				middlewares: [],
			},
			{
				method: 'post',
				path: '/coursesByTags',
				func: this.getCoursesByTags,
				middlewares: [new ValidateMiddleware(CourseByTagsDto)],
			},
		]);
	}

	@TryCatchWrapper
	async getAllCourses(req: Request, res: Response, next: NextFunction): Promise<void> {
		const result = await this.coursesService.getAllCourses();
		this.ok(res, result);
	}

	@TryCatchWrapper
	async createCourse({ body }: Request, res: Response, next: NextFunction): Promise<void> {
		const result = await this.coursesService.createCourse(body);
		this.ok(res, result);
	}

	@TryCatchWrapper
	async updateCourse({ body }: Request, res: Response, next: NextFunction): Promise<void> {
		const result = await this.coursesService.updateCourse(body);
		this.ok(res, result);
	}

	@TryCatchWrapper
	async deleteCourse({ body }: Request, res: Response, next: NextFunction): Promise<void> {
		const result = await this.coursesService.deleteCourse(body.id);
		this.ok(res, result);
	}

	@TryCatchWrapper
	async getCoursesByCategory(
		{ params }: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.coursesService.getCoursesByCategory(+params.categoryId);
		this.ok(res, result);
	}

	@TryCatchWrapper
	async getCoursesByTags({ body }: Request, res: Response, next: NextFunction): Promise<void> {
		const result = await this.coursesService.getCoursesByTags(body.tags);
		this.ok(res, result);
	}
}
