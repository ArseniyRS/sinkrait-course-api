import { TagModel } from '@prisma/client';
import { TagDto } from '../dto/tag.dto';

export interface ITagsService {
	createTag(Tag: TagDto): Promise<TagModel>;
	updateTag(Tag: TagDto): Promise<TagModel | null>;
	deleteTag(id: number): Promise<TagModel | null>;
	getAllTags(): Promise<TagModel[]>;
}
