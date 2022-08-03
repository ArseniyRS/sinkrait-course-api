export const TYPES = {
	Application: Symbol.for('Application'),
	ILogger: Symbol.for('ILogger'),
	UserController: Symbol.for('UserController'),
	UserService: Symbol.for('UserService'),
	ExeptionFilter: Symbol.for('ExeptionFilter'),
	ConfigService: Symbol.for('ConfigService'),
	PrismaService: Symbol.for('PrismaService'),
	UsersRepository: Symbol.for('UsersRepository'),

	CategoriesRepository: Symbol.for('CategoriesRepository'),
	CategoriesService: Symbol.for('CategoriesService'),
	CategoriesController: Symbol.for('CategoriesController'),

	CoursesRepository: Symbol.for('CoursesRepository'),
	CoursesService: Symbol.for('CoursesService'),
	CoursesController: Symbol.for('CoursesController'),
};
