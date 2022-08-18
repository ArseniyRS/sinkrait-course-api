import { IsNumber, IsOptional, IsString } from 'class-validator';
import { UploadedFile } from 'express-fileupload';
import { IsFile } from '../../utils/file.validator';

export class CourseDto {
	@IsOptional()
	@IsNumber()
	id: number;
	@IsString()
	title: string;
	@IsFile({ mime: ['image/jpg', 'image/png', 'image/jpeg'] })
	img: UploadedFile | string;
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
	tags: Array<number>;
	@IsOptional()
	@IsNumber({}, { each: true })
	benefits: Array<number>;
}

export class CourseDtoModel extends CourseDto {
	img: string;
}
