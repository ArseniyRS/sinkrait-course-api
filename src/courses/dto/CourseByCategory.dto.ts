import { IsNumber } from 'class-validator';

export class CourseByCategoryDto {
	@IsNumber()
	categoryId: number;
}
