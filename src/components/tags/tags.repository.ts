import { Prisma, TagModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { PrismaService } from '../../database/prisma.service';
import { TYPES } from '../../types';
import 'reflect-metadata';
import { ITagsRepository } from './interfaces/tags.repository.interface';
import { TagDto } from './dto/tag.dto';

@injectable()
export class TagsRepository implements ITagsRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

	async create({ name }: TagDto): Promise<TagModel> {
		return this.prismaService.client.tagModel.create({
			data: { name },
		});
	}

	async update({ id, name }: TagDto): Promise<TagModel> {
		return this.prismaService.client.tagModel.update({
			where: { id },
			data: { name },
		});
	}

	async getAll(): Promise<TagModel[]> {
		return this.prismaService.client.tagModel.findMany();
	}

	async delete(id: number): Promise<TagModel | null> {
		return this.prismaService.client.tagModel.delete({ where: { id } });
	}
}
