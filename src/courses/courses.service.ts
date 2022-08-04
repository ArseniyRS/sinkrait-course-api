import { CourseModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { CourseDto } from './dto/Course.dto';
import { ICoursesRepository } from './interfaces/courses.repository.interface';
import { ICoursesService } from './interfaces/courses.service.interface';
@injectable()
export class CoursesService implements ICoursesService {
	constructor(@inject(TYPES.CoursesRepository) private coursesRepository: ICoursesRepository) {}

	async getAllCourses(): Promise<CourseModel[]> {
		return this.coursesRepository.getCourses();
	}

	async createCourse(course: CourseDto): Promise<CourseModel> {
		return this.coursesRepository.createCourse(course);
	}

	async updateCourse(course: CourseDto): Promise<CourseModel> {
		return this.coursesRepository.updateCourse(course);
	}

	async deleteCourse(id: number): Promise<CourseModel> {
		return this.coursesRepository.deleteCourse(id);
	}

	async getCoursesByCategory(categoryId: number): Promise<CourseModel[]> {
		return this.coursesRepository.getCoursesByCategory(categoryId);
	}

	async getCoursesByTags(tags: number[]): Promise<CourseModel[]> {
		return this.coursesRepository.getCoursesByTags(tags);
	}
}
