import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CategoryDto {
	@IsOptional()
	@IsNumber()
	id: number;
	@IsString({ message: 'Password is not valid' })
	name: string;
	@IsOptional()
	@IsNumber()
	categoryId: number;
}
