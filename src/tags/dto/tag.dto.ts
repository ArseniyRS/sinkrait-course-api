import { IsNumber, IsOptional, IsString } from 'class-validator';

export class TagDto {
	@IsOptional()
	@IsNumber()
	id: number;
	@IsString()
	name: string;
}
