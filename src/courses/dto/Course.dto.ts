import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CourseDto {
	@IsOptional()
	@IsNumber()
	id: number;
	@IsString()
	title: string;
	@IsString()
	description: string;
	@IsNumber()
	price: number;
	@IsNumber()
	creditPrice: number;
	@IsOptional()
	@IsNumber()
	categoryId: number;
	@IsOptional()
	@IsNumber({}, { each: true })
	tags: Array<number>[];
}
