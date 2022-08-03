import { inject, injectable } from 'inversify';
import { PrismaService } from '../database/prisma.service';
import { TYPES } from '../types';
import { CourseDto } from './dto/Course.dto';
import { ICoursesRepository } from './interfaces/courses.repository.interface';

@injectable()
export class CoursesRepository implements ICoursesRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

	async getCourses(): Promise<CoursesModel> {
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
	}: CourseDto): Promise<CoursesModel> {
		return this.prismaService.client.courseModel.create({
			data: {
				title,
				description,
				price,
				creditPrice,
				categoryId,
				tags: {
					create: tags.map((id) => ({ tag: { connect: { id } } })),
				},
			},
		});
	}
	async updateCourse(course: CourseDto): Promise<CoursesModel> {}

	async deleteCourse(id: number): Promise<CourseModel> {
		return this.prismaService.client.courseModel.delete({ where: id });
	}
}
