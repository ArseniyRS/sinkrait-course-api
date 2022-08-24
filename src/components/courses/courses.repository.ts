import { CourseModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { PrismaService } from '../../database/prisma.service';
import { TYPES } from '../../types';
import { CourseDto } from './dto/Course.dto';
import { ICoursesRepository } from './interfaces/courses.repository.interface';

@injectable()
export class CoursesRepository implements ICoursesRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

	async getCourses(): Promise<CourseModel[]> {
		return this.prismaService.client.courseModel.findMany({
			include: {
				tags: true,
				rate: true,
			},
		});
	}

	async createCourse({
		title,
		description,
		img,
		price,
		creditPrice,
		categoryId,
		tags,
		benefits,
	}: CourseDto): Promise<CourseModel> {
		return this.prismaService.client.courseModel.create({
			data: {
				title,
				img,
				description,
				price,
				creditPrice,
				categoryId,
				tags: {
					connect: tags ? tags.map((id: number) => ({ id })) : [],
				},
				benefits: {
					connect: benefits ? benefits.map((id: number) => ({ id })) : [],
				},
			},
			include: {
				tags: true,
				benefits: true,
			},
		});
	}

	async updateCourse({
		id,
		title,
		description,
		price,
		img,
		creditPrice,
		categoryId,
		tags,
		benefits,
	}: CourseDto): Promise<CourseModel> {
		return this.prismaService.client.courseModel.update({
			where: { id },
			data: {
				title,
				img,
				description,
				price,
				creditPrice,
				categoryId,
				tags: {
					connect: tags ? tags.map((id: number) => ({ id })) : [],
				},
				benefits: {
					connect: benefits ? benefits.map((id: number) => ({ id })) : [],
				},
			},
		});
	}

	async deleteCourse(id: number): Promise<CourseModel> {
		return this.prismaService.client.courseModel.delete({ where: { id } });
	}

	async getCoursesByCategory(categoryId: number): Promise<CourseModel[]> {
		return this.prismaService.client.courseModel.findMany({
			where: { categoryId },
		});
	}

	async getCoursesByTags(tags: number[]): Promise<CourseModel[]> {
		return this.prismaService.client.courseModel.findMany({
			where: { tags: { some: { id: { in: tags } } } },
			include: { tags: true },
		});
	}
}
