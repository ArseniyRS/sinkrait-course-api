import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './app';
import { CategoriesController } from './categories/categories.controller';
import { CategoriesRepository } from './categories/categories.repository';
import { CategoriesService } from './categories/categories.service';
import { ICategoriesController } from './categories/interfaces/categories.controller.interface';
import { ICategoriesRepository } from './categories/interfaces/categories.repository.interface';
import { ICategoriesService } from './categories/interfaces/categories.service.interface';
import { ConfigService } from './config/config.service';
import { IConfigService } from './config/config.service.interface';
import { CoursesController } from './courses/coureses.controller';
import { CoursesRepository } from './courses/courses.repository';
import { CoursesService } from './courses/courses.service';
import { ICoursesController } from './courses/interfaces/courses.controller.interface';
import { ICoursesRepository } from './courses/interfaces/courses.repository.interface';
import { ICoursesService } from './courses/interfaces/courses.service.interface';
import { PrismaService } from './database/prisma.service';
import { ExeptionFilter } from './errors/exeption.filter';
import { IExceptionFilter } from './errors/exeption.filter.interface';
import { ILogger } from './logger/logger.interface';
import { LoggerService } from './logger/logger.service';
import { TYPES } from './types';
import { IUserService } from './users/interfaces/user.service.interface';
import { IUsersRepository } from './users/interfaces/users.repository.interface';
import { UserController } from './users/users.controller';
import { UsersRepository } from './users/users.repository';
import { UserService } from './users/users.service';

interface IBootstrapReturn {
	appContainer: Container;
	app: App;
}
export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	bind<IExceptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
	bind<UserController>(TYPES.UserController).to(UserController);
	bind<IUserService>(TYPES.UserService).to(UserService);
	bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
	bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
	bind<IUsersRepository>(TYPES.UsersRepository).to(UsersRepository);

	bind<ICategoriesRepository>(TYPES.CategoriesRepository).to(CategoriesRepository);
	bind<ICategoriesService>(TYPES.CategoriesService).to(CategoriesService);
	bind<ICategoriesController>(TYPES.CategoriesController).to(CategoriesController);

	bind<ICoursesRepository>(TYPES.CategoriesRepository).to(CoursesRepository);
	bind<ICoursesService>(TYPES.CoursesService).to(CoursesService);
	bind<ICoursesController>(TYPES.CoursesController).to(CoursesController);

	bind<App>(TYPES.Application).to(App);
});

function bootstrap(): IBootstrapReturn {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	app.init();
	return { appContainer, app };
}

export const { app, appContainer } = bootstrap();
