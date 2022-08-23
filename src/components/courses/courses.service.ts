import { CourseModel } from '@prisma/client';
import { UploadedFile } from 'express-fileupload';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { CourseDto } from './dto/Course.dto';
import { ICoursesRepository } from './interfaces/courses.repository.interface';
import { ICoursesService } from './interfaces/courses.service.interface';
import fs from 'fs';
import path from 'path';
import { IConfigService } from '../config/config.service.interface';
@injectable()
export class CoursesService implements ICoursesService {
	constructor(
		@inject(TYPES.CoursesRepository) private coursesRepository: ICoursesRepository,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {}

	async getAllCourses(): Promise<CourseModel[]> {
		return this.coursesRepository.getCourses();
	}

	async createCourse(course: CourseDto): Promise<CourseModel> {
		const imgLink = await this.saveOrUpdateCourseImg(course.id, course.img as UploadedFile);
		return this.coursesRepository.createCourse({ ...course, img: imgLink });
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

	async saveOrUpdateCourseImg(id: number, img: UploadedFile): Promise<string> {
		return new Promise((resolve, reject) => {
			try {
				const filePath = path.resolve(__dirname, this.configService.get('PATH_IMAGES') + id);
				if (fs.existsSync(filePath)) {
					fs.unlinkSync(filePath);
				}
				img.mv(filePath);
				return resolve(filePath);
			} catch (e) {
				return reject(null);
			}
		});
	}
}
