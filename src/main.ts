import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './app';
import { ExeptionFilter } from './errors/exeption.filter';
import { IExceptionFilter } from './errors/exeption.filter.interface';
import { ILogger } from './logger/logger.interface';
import { LoggerService } from './logger/logger.service';
import { TYPES } from './types';
import { IUserService } from './users/interfaces/user.service.interface';
import { UserController } from './users/users.controller';
import { UserService } from './users/users.service';

interface IBootstrapReturn {
	appContainer: Container;
	app: App;
}
export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService);
	bind<IExceptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
	bind<UserController>(TYPES.UserController).to(UserController);
	bind<IUserService>(TYPES.UserService).to(UserService);
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
