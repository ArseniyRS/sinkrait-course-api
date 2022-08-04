import { TagModel } from '@prisma/client';
import { TagDto } from '../dto/tag.dto';

export interface ITagsRepository {
	create(category: TagDto): Promise<TagModel>;
	getAll(): Promise<TagModel[]>;
	update(category: TagDto): Promise<TagModel>;
	delete(id: number): Promise<TagModel | null>;
}
