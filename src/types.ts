export const TYPES = {
	Application: Symbol.for('Application'),
	ILogger: Symbol.for('ILogger'),
	ExeptionFilter: Symbol.for('ExeptionFilter'),
	ConfigService: Symbol.for('ConfigService'),
	PrismaService: Symbol.for('PrismaService'),

	UsersRepository: Symbol.for('UsersRepository'),
	UserService: Symbol.for('UserService'),
	UserController: Symbol.for('UserController'),

	CategoriesRepository: Symbol.for('CategoriesRepository'),
	CategoriesService: Symbol.for('CategoriesService'),
	CategoriesController: Symbol.for('CategoriesController'),

	CoursesRepository: Symbol.for('CoursesRepository'),
	CoursesService: Symbol.for('CoursesService'),
	CoursesController: Symbol.for('CoursesController'),

	TagsRepository: Symbol.for('TagsRepository'),
	TagsService: Symbol.for('TagsService'),
	TagsController: Symbol.for('TagsController'),
};
