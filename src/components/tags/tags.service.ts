import { CategoryModel, Prisma, TagModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';

import 'reflect-metadata';
import { ITagsService } from './interfaces/tags.service.interface';
import { ITagsRepository } from './interfaces/tags.repository.interface';
import { TagDto } from './dto/tag.dto';

@injectable()
export class TagsService implements ITagsService {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.TagsRepository) private tagsRepository: ITagsRepository,
	) {}

	async createTag(tag: TagDto): Promise<TagModel> {
		return this.tagsRepository.create(tag);
	}
	async updateTag(tag: TagDto): Promise<TagModel | null> {
		return this.tagsRepository.update(tag);
	}

	async deleteTag(id: number): Promise<TagModel | null> {
		const result = await this.tagsRepository.delete(id);
		return result;
	}

	async getAllTags(): Promise<TagModel[]> {
		return this.tagsRepository.getAll();
	}
}
