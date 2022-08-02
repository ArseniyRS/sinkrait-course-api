import { CategoryModel, Prisma } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { PrismaService } from '../database/prisma.service';
import { TYPES } from '../types';
import { CategoryDto } from './dto/category.dto';
import { ICategoriesRepository } from './interfaces/categories.repository.interface';

@injectable()
export class CategoriesRepository implements ICategoriesRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

	async create({ name, categoryId }: CategoryDto): Promise<CategoryModel> {
		return this.prismaService.client.categoryModel.create({
			data: { name, categoryId },
		});
	}

	async update({ id, name, categoryId }: CategoryDto): Promise<CategoryModel> {
		return this.prismaService.client.categoryModel.update({
			where: { id },
			data: { name, categoryId },
		});
	}

	async getAll(): Promise<CategoryModel[]> {
		return this.prismaService.client.categoryModel.findMany({
			where: { categoryId: null },
			include: {
				categories: {
					include: { categories: true },
				},
			},
		});
	}

	async delete(id: number): Promise<CategoryModel | null> {
		return this.prismaService.client.categoryModel.delete({ where: { id } });
	}
}
