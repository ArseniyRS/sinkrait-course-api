import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './app';
import { CategoriesController } from './components/categories/categories.controller';
import { CategoriesRepository } from './components/categories/categories.repository';
import { CategoriesService } from './components/categories/categories.service';
import { ICategoriesController } from './components/categories/interfaces/categories.controller.interface';
import { ICategoriesRepository } from './components/categories/interfaces/categories.repository.interface';
import { ICategoriesService } from './components/categories/interfaces/categories.service.interface';
import { ConfigService } from './config/config.service';
import { IConfigService } from './config/config.service.interface';
import { CoursesController } from './components/courses/coureses.controller';
import { CoursesRepository } from './components/courses/courses.repository';
import { CoursesService } from './components/courses/courses.service';
import { ICoursesController } from './components/courses/interfaces/courses.controller.interface';
import { ICoursesRepository } from './components/courses/interfaces/courses.repository.interface';
import { ICoursesService } from './components/courses/interfaces/courses.service.interface';
import { PrismaService } from './database/prisma.service';
import { ExeptionFilter } from './errors/exeption.filter';
import { IExceptionFilter } from './errors/exeption.filter.interface';
import { ILogger } from './logger/logger.interface';
import { LoggerService } from './logger/logger.service';
import { ITagsController } from './components/tags/interfaces/tags.controller.interface';
import { ITagsRepository } from './components/tags/interfaces/tags.repository.interface';
import { ITagsService } from './components/tags/interfaces/tags.service.interface';
import { TagsController } from './components/tags/tags.controller';
import { TagsRepository } from './components/tags/tags.repository';
import { TagsService } from './components/tags/tags.service';
import { TYPES } from './types';
import { IUserService } from './components/users/interfaces/user.service.interface';
import { IUsersRepository } from './components/users/interfaces/users.repository.interface';
import { UserController } from './components/users/users.controller';
import { UsersRepository } from './components/users/users.repository';
import { UserService } from './components/users/users.service';

interface IBootstrapReturn {
	appContainer: Container;
	app: App;
}
export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	bind<IExceptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
	bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
	bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();

	bind<IUsersRepository>(TYPES.UsersRepository).to(UsersRepository);
	bind<IUserService>(TYPES.UserService).to(UserService);
	bind<UserController>(TYPES.UserController).to(UserController);

	bind<ICategoriesRepository>(TYPES.CategoriesRepository).to(CategoriesRepository);
	bind<ICategoriesService>(TYPES.CategoriesService).to(CategoriesService);
	bind<ICategoriesController>(TYPES.CategoriesController).to(CategoriesController);

	bind<ICoursesRepository>(TYPES.CoursesRepository).to(CoursesRepository);
	bind<ICoursesService>(TYPES.CoursesService).to(CoursesService);
	bind<ICoursesController>(TYPES.CoursesController).to(CoursesController);

	bind<ITagsRepository>(TYPES.TagsRepository).to(TagsRepository);
	bind<ITagsService>(TYPES.TagsService).to(TagsService);
	bind<ITagsController>(TYPES.TagsController).to(TagsController);

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
