import { IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator';

export class CourseDto {
	@IsOptional()
	@IsNumber()
	id: number;
	@IsString()
	title: string;
	@IsOptional()
	img: string;
	@IsString()
	description: string;
	@IsNumber()
	@ValidateIf((object, value) => isNaN(+value))
	price: number;
	@IsNumber()
	@ValidateIf((object, value) => isNaN(+value))
	creditPrice: number;
	@IsOptional()
	@IsNumber()
	@ValidateIf((object, value) => value != 'null')
	categoryId: number;
	@IsOptional()
	@IsNumber({}, { each: true })
	@ValidateIf((object, value) => value != 'null')
	tags: Array<number>;
	@IsOptional()
	@IsNumber({}, { each: true })
	@ValidateIf((object, value) => value != 'null')
	benefits: Array<number>;
}
