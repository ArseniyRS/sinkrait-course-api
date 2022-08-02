import { CategoryModel } from '@prisma/client';
import { CategoryDto } from '../dto/category.dto';

export interface ICategoriesRepository {
	create(category: CategoryDto): Promise<CategoryModel>;
	getAll(): Promise<CategoryModel[]>;
	update(category: CategoryDto): Promise<CategoryModel>;
	delete(id: number): Promise<CategoryModel | null>;
}
