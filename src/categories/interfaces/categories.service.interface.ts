import { CategoryModel } from '@prisma/client';
import { CategoryDto } from '../dto/category.dto';

export interface ICategoriesService {
	createCategory(category: CategoryDto): Promise<CategoryModel>;
	updateCategory(category: CategoryDto): Promise<CategoryModel | null>;
	deleteCategory(id: number): Promise<CategoryModel | null>;
	getAllCategories(): Promise<CategoryModel[]>;
}
