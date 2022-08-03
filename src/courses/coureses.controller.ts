import { inject, injectable } from 'inversify';
import { BaseController } from '../common/base.controller';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { ICoursesController } from './interfaces/courses.controller.interface';
import { ICoursesService } from './interfaces/courses.service.interface';

injectable();
export class CoursesController extends BaseController implements ICoursesController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.CoursesService) private coursesService: ICoursesService,
	) {
		super(loggerService);
		this.bindRoutes([]);
	}
}
