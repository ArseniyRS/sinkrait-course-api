import { CourseModel } from '@prisma/client';
import { CourseDto } from '../dto/Course.dto';

export interface ICoursesService {
	createCourse(course: CourseDto): Promise<CourseModel>;
	updateCourse(course: CourseDto): Promise<CourseModel | null>;
	deleteCourse(id: number): Promise<CourseModel | null>;
	getAllCourses(): Promise<CourseModel[]>;
	getCoursesByCategory(categoryId: number): Promise<CourseModel[]>;
	getCoursesByTags(tags: number[]): Promise<CourseModel[]>;
}
