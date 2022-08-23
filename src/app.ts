import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import { ExeptionFilter } from './errors/exeption.filter';
import { ILogger } from './logger/logger.interface';
import { LoggerService } from './logger/logger.service';
import { TYPES } from './types';
import { UserController } from './components/users/users.controller';
import { json } from 'body-parser';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import 'reflect-metadata';
import { IConfigService } from './config/config.service.interface';
import { IExceptionFilter } from './errors/exeption.filter.interface';
import { PrismaService } from './database/prisma.service';
import { AuthMiddleware } from './common/auth.middleware';
import { CategoriesController } from './components/categories/categories.controller';
import { CoursesController } from './components/courses/coureses.controller';
import { TagsController } from './components/tags/tags.controller';
@injectable()
export class App {
	app: Express;
	port: number;
	server: Server | undefined;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.UserController) private userController: UserController,
		@inject(TYPES.CategoriesController) private categoriesController: CategoriesController,
		@inject(TYPES.CoursesController) private coursesController: CoursesController,
		@inject(TYPES.TagsController) private tagsController: TagsController,
		@inject(TYPES.ExeptionFilter) private exeptionFilter: IExceptionFilter,
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.PrismaService) private prismaService: PrismaService,
	) {
		this.app = express();
		this.port = 8000;
	}

	useMiddleware(): void {
		this.app.use(cors());
		this.app.use(fileUpload());
		this.app.use(json());
		const authMiddleware = new AuthMiddleware(this.configService.get('JWT_SECRET'));
		this.app.use(authMiddleware.execute.bind(authMiddleware));
	}
	useRoutes(): void {
		this.app.use('/users', this.userController.router);
		this.app.use('/categories', this.categoriesController.router);
		this.app.use('/courses', this.coursesController.router);
		this.app.use('/tags', this.tagsController.router);
	}
	useExeptionFilters(): void {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
	}
	public async init(): Promise<void> {
		this.useMiddleware();
		this.useRoutes();
		this.useExeptionFilters();
		await this.prismaService.connect();
		this.server = this.app.listen(this.port);
		this.logger.info(`Server started on port ${this.port}`);
	}
}
