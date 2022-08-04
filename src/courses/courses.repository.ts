import { CourseModel } from '@prisma/client';
import { connect } from 'http2';
import { inject, injectable } from 'inversify';
import { PrismaService } from '../database/prisma.service';
import { TYPES } from '../types';
import { CourseDto } from './dto/Course.dto';
import { ICoursesRepository } from './interfaces/courses.repository.interface';

@injectable()
export class CoursesRepository implements ICoursesRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

	async getCourses(): Promise<CourseModel[]> {
		return this.prismaService.client.courseModel.findMany({
			include: {
				tags: true,
			},
		});
	}

	async createCourse({
		title,
		description,
		price,
		creditPrice,
		categoryId,
		tags,
	}: CourseDto): Promise<CourseModel> {
		return this.prismaService.client.courseModel.create({
			data: {
				title,
				description,
				price,
				creditPrice,
				categoryId,
				tags: {
					connect: tags ? tags.map((id: number) => ({ id })) : [],
				},
			},
		});
	}

	async updateCourse({
		id,
		title,
		description,
		price,
		creditPrice,
		categoryId,
		tags,
	}: CourseDto): Promise<CourseModel> {
		return this.prismaService.client.courseModel.update({
			where: { id },
			data: {
				title: title,
				description: description,
				price: price,
				creditPrice: creditPrice,
				categoryId: categoryId,
				tags: {
					connect: tags ? tags.map((id: number) => ({ id })) : [],
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
