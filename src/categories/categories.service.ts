import { CategoryModel, Prisma } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { CategoryDto } from './dto/category.dto';
import { ICategoriesRepository } from './interfaces/categories.repository.interface';
import { ICategoriesService } from './interfaces/categories.service.interface';
import 'reflect-metadata';
import { ErrorCatcher } from '../decorators/ErrorCatcher';

@injectable()
export class CategoriesService implements ICategoriesService {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.CategoriesRepository) private categoriesRepository: ICategoriesRepository,
	) {}

	async createCategory(category: CategoryDto): Promise<CategoryModel> {
		return this.categoriesRepository.create(category);
	}
	async updateCategory(category: CategoryDto): Promise<CategoryModel | null> {
		return this.categoriesRepository.update(category);
	}

	async deleteCategory(id: number): Promise<CategoryModel | null> {
		//try {
		const result = await this.categoriesRepository.delete(id);
		return result;
		// } catch (e) {
		// 	if (e instanceof Prisma.PrismaClientKnownRequestError) {
		// 		this.loggerService.error(`[${e.code}] - ${e.message}`);
		// 		return null;
		// 	}
		// 	return null;
		// }
	}

	async getAllCategories(): Promise<CategoryModel[]> {
		return this.categoriesRepository.getAll();
	}
}
