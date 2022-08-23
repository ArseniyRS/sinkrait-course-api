import { IsNumber } from 'class-validator';

export class CourseByTagsDto {
	@IsNumber({}, { each: true })
	tags: number[];
}
